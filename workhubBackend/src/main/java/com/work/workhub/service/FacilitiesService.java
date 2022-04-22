package com.work.workhub.service;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.Facilities;
import com.work.workhub.entity.TimeF;
import com.work.workhub.repository.FacilitiesRepository;
import com.work.workhub.repository.TimeFRepository;
import com.work.workhub.util.DateUtil;
import com.work.workhub.util.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * @author md
 * @date 2022/4/6
 * @description
 */
@Service
@Transactional
public class FacilitiesService {

    @Autowired
    FacilitiesRepository facilitiesRepository;

    @Autowired
    TimeFRepository timeFRepository;

    public BaseResult edit(Facilities facilities) {
        try {
            facilities.setType(2);
            String name = facilities.getName();
            if(null==name||"".equals(name)){
                return BaseResult.error("-1","facilities name cannot be empty");
            }
            String venueName = facilities.getVenueName();
            if(null==venueName||"".equals(venueName)){
                return BaseResult.error("-1","Venue name cannot be empty");
            }
            Facilities byName = facilitiesRepository.getByName(name,venueName);

            String id = facilities.getId();
            if(null==id||"".equals(id)){
                if(Objects.nonNull(byName)){
                    return BaseResult.error("-1","User name already exists");
                }
                facilities.setId(UUIDUtil.uuid());
                facilities.setCreateTime(new Date());

            }else {
                if(Objects.nonNull(byName)&&!id.equals(byName.getId())){
                    return BaseResult.error("-1","User name already exists");
                }
                Facilities byId = facilitiesRepository.getById(id);
                if(Objects.isNull(byId)){
                    return BaseResult.error("-1","User information does not exist");
                }
                facilities.setCreateTime(byId.getCreateTime());
            }
            facilitiesRepository.save(facilities);

            String startDate = facilities.getStartDate();
            String endDate = facilities.getEndDate();
            timeFRepository.del(facilities.getId(),startDate,endDate);
            while (endDate.compareTo(startDate)>=0){
                TimeF timeF=new TimeF();
                timeF.setPId(facilities.getId());
                timeF.setId(startDate+facilities.getId());
                timeF.setPrice(facilities.getPrice());
                timeF.setTime(startDate);
                timeF.setMaxNum(facilities.getNum());
                if(null==id||"".equals(id)){
                    timeF.setNums(facilities.getNum());
                }else {
                    TimeF timeF1 = timeFRepository.getById(startDate + facilities.getId());
                    if (Objects.nonNull(timeF1)) {
                        timeF.setNums(facilities.getNum()+timeF1.getMaxNum()-timeF1.getNums());
                    }else {
                        timeF.setNums(facilities.getNum());
                    }
                }

                timeFRepository.save(timeF);
                startDate= DateUtil.getDateBeforeStr(startDate,-1);
            }

            return BaseResult.success("successfully");

        }catch (Exception e){
            e.printStackTrace();
            return BaseResult.error("-1","Exception");
        }
    }

    public BaseResult del(List<String> ids) {
        if(null!=ids&&ids.size()>0){
            Integer del = facilitiesRepository.del(ids);
            timeFRepository.del(ids);
        }
        return BaseResult.success("successfully");
    }

    public BaseResult find(JSONObject jsonObject) {
        Facilities facilities = JSONObject.toJavaObject(jsonObject, Facilities.class);
        Integer pageNo = jsonObject.getInteger("pageNo");
        Integer pageSize = jsonObject.getInteger("pageSize");
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Specification<Facilities> querySpecifi = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (null!=facilities.getName()&&!"".equals(facilities.getName())) {
                predicates.add(cb.like((root.get("name")), "%" +facilities.getName() + "%"));
            }
            if (null!=facilities.getVenueName()&&!"".equals(facilities.getVenueName())) {
                predicates.add(cb.like((root.get("venueName")), "%" +facilities.getVenueName() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Page<Facilities> facilitiess = facilitiesRepository.findAll(querySpecifi, pageable);
        return BaseResult.success(facilitiess);
    }
}
