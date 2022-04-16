package com.work.workhub.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.*;
import com.work.workhub.repository.*;
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
 * @author mz
 * @date 2022/4/6
 * @description
 */
@Service
@Transactional
public class VenulService {

    @Autowired
    VenueRepository venueRepository;

    @Autowired
    FacilitiesRepository facilitiesRepository;

    @Autowired
    ActivitiesRepository activitiesRepository;

    @Autowired
    TimeARepository timeARepository;
    @Autowired
    TimeFRepository timeFRepository;

    public BaseResult edit(Venue venue) {
        try {
            String name = venue.getName();
            if(null==name||"".equals(name)){
                return BaseResult.error("-1","venue name cannot be empty");
            }
            Venue byName = venueRepository.getByName(name);

            String id = venue.getId();
            if(null==id||"".equals(id)){
                if(Objects.nonNull(byName)){
                    return BaseResult.error("-1","User name already exists");
                }
                venue.setId(UUIDUtil.uuid());
                venue.setCreateTime(new Date());

            }else {
                if(Objects.nonNull(byName)&&!id.equals(byName.getId())){
                    return BaseResult.error("-1","User name already exists");
                }
                Venue byId = venueRepository.getById(id);
                if(Objects.isNull(byId)){
                    return BaseResult.error("-1","User information does not exist");
                }
                venue.setCreateTime(byId.getCreateTime());
            }

            venueRepository.save(venue);
            return BaseResult.success("successfully");

        }catch (Exception e){
            return BaseResult.error("-1","Exception");
        }
    }

    public BaseResult del(List<String> ids) {
        if(null!=ids&&ids.size()>0){
            Integer del = venueRepository.del(ids);
        }
        return BaseResult.success("successfully");
    }

    public BaseResult find(JSONObject jsonObject) {
        Venue venue = JSONObject.toJavaObject(jsonObject, Venue.class);
        Integer pageNo = jsonObject.getInteger("pageNo");
        Integer pageSize = jsonObject.getInteger("pageSize");
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Specification<Venue> querySpecifi = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (null!=venue.getName()&&!"".equals(venue.getName())) {
                predicates.add(cb.like((root.get("name")), "%" +venue.getName() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Page<Venue> venues = venueRepository.findAll(querySpecifi, pageable);
        return BaseResult.success(venues);
    }

    public BaseResult list() {
        List<Venue> all = venueRepository.findAll();
        return BaseResult.success(all);
    }

    public BaseResult getList(String id) {
        JSONArray data=new JSONArray();
        try {
            Date date = new Date();
            String startDate = DateUtil.getDateBeforeStr(date, -1);
            String endDate = DateUtil.getDateBeforeStr(date, -7);
            List<Facilities> facilities = facilitiesRepository.getByVenueId(id, startDate, endDate);
            List<Activities> activities = activitiesRepository.getByVenueId(id, startDate, endDate);
            data.addAll(facilities);
            data.addAll(activities);

        }catch (Exception e){
            e.printStackTrace();
            return BaseResult.error("-1","system err");
        }
        return BaseResult.success(data);
    }

    public BaseResult getTimes(String id, int type) {

        Date date = new Date();
        String startDate = DateUtil.getDateBeforeStr(date, -1);
        String endDate = DateUtil.getDateBeforeStr(date, -7);
        if(type==1){
            List<TimeA> timeAS = timeARepository.getByPid(id,startDate,endDate);
            return BaseResult.success(timeAS);
        }else if(type==2){
            List<TimeF> timeFS = timeFRepository.getByPid(id,startDate,endDate);
            return BaseResult.success(timeFS);
        }else {
            return BaseResult.error("-1","type err");
        }

    }

    public BaseResult getListByTime(String startDate, String endDate) {
        JSONArray data=new JSONArray();
        try {
            String date = DateUtil.getDateBeforeStr(new Date(),-1);
            if(date.compareTo(startDate)>0){
                return BaseResult.error("-1","please start "+date);
            }

            List<Facilities> facilities = facilitiesRepository.getByDate( startDate, endDate);
            List<Activities> activities = activitiesRepository.getByDate( startDate, endDate);
            data.addAll(facilities);
            data.addAll(activities);

        }catch (Exception e){
            e.printStackTrace();
            return BaseResult.error("-1","systen err");
        }

        return BaseResult.success(data);
    }
}
