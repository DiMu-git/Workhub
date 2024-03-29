package com.work.workhub.service;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.Activities;
import com.work.workhub.entity.TimeA;
import com.work.workhub.repository.ActivitiesRepository;
import com.work.workhub.repository.TimeARepository;
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
public class ActivitiesService {

    @Autowired
    ActivitiesRepository activitiesRepository;

    @Autowired
    TimeARepository timeARepository;

    public BaseResult edit(Activities activities) {
        try {
            activities.setType(1);
            String name = activities.getName();
            if(null==name||"".equals(name)){
                return BaseResult.error("-1","Course name cannot be empty");
            }
            String venueName = activities.getVenueName();
            if(null==venueName||"".equals(venueName)){
                return BaseResult.error("-1","Venue name cannot be empty");
            }
            Activities byName = activitiesRepository.getByName(name,venueName);

            String id = activities.getId();
            if(null==id||"".equals(id)){
                if(Objects.nonNull(byName)){
                    return BaseResult.error("-1","Course name already exists");
                }
                activities.setId(UUIDUtil.uuid());
                activities.setCreateTime(new Date());

            }else {
                if(Objects.nonNull(byName)&&!id.equals(byName.getId())){
                    return BaseResult.error("-1","User name already exists");
                }
                Activities byId = activitiesRepository.getById(id);
                if(Objects.isNull(byId)){
                    return BaseResult.error("-1","User information does not exist");
                }
                activities.setCreateTime(byId.getCreateTime());
            }
            activitiesRepository.save(activities);


            String startDate = activities.getStartDate();
            String endDate = activities.getEndDate();
            timeARepository.del(activities.getId(),startDate,endDate);
            while (endDate.compareTo(startDate)>=0){

                TimeA timeA=new TimeA();
                timeA.setPId(activities.getId());
                timeA.setPrice(activities.getPrice());
                timeA.setNum(activities.getNum());
                timeA.setRemainNum(activities.getNum());
                timeA.setTime(startDate);
//                timeA.setAfternoon(activities.getAfternoon());
//                timeA.setMorning(activities.getMorning());
//                timeA.setNight(activities.getNight());
                if(null==id||"".equals(id)){
                    timeA.setNum(activities.getNum());
//                    timeA.setAfternoonNums(activities.getAfternoon());
//                    timeA.setMorningNums(activities.getMorning());
//                    timeA.setNightNums(activities.getNight());
                }else {
                    TimeA timeA1 = timeARepository.getById(startDate + activities.getId());
                    if (Objects.nonNull(timeA1)) {
                        timeA.setNum(activities.getNum()+timeA1.getNum()-timeA1.getRemainNum());
//                        timeA.setAfternoonNums(activities.getAfternoon()+timeA1.getAfternoon()-timeA1.getAfternoonNums());
//                        timeA.setMorningNums(activities.getMorning()+timeA1.getMorning()-timeA1.getMorningNums());
//                        timeA.setNightNums(activities.getNight()+timeA1.getNight()-timeA1.getNightNums());
                    }else {
//                        timeA.setAfternoonNums(activities.getAfternoon());
//                        timeA.setMorningNums(activities.getMorning());
//                        timeA.setNightNums(activities.getNight());
                        timeA.setRemainNum(activities.getNum());
                    }
                }
                for(int i=0; i<9; i++){
                    switch (i){
                        case 0:
                            timeA.setDuringTime("8:00-9:00");
                            timeA.setStatus(1);
                            break;
                        case 1:
                            timeA.setDuringTime("9:00-10:00");
                            timeA.setStatus(1);
                            break;
                        case 2:
                            timeA.setDuringTime("10:00-11:00");
                            timeA.setStatus(1);
                            break;
                        case 3:
                            timeA.setDuringTime("14:00-15:00");
                            timeA.setStatus(2);
                            break;
                        case 4:
                            timeA.setDuringTime("15:00-16:00");
                            timeA.setStatus(2);
                            break;
                        case 5:
                            timeA.setDuringTime("16:00-17:00");
                            timeA.setStatus(2);
                            break;
                        case 6:
                            timeA.setDuringTime("17:00-18:00");
                            timeA.setStatus(2);
                            break;
                        case 7:
                            timeA.setDuringTime("20:00-21:00");
                            timeA.setStatus(3);
                            break;
                        case 8:
                            timeA.setDuringTime("21:00-22:00");
                            timeA.setStatus(3);
                            break;
                        default :
                            break;
                    }
                    timeA.setId(timeA.getDuringTime()+startDate+activities.getId());
                    timeARepository.save(timeA);
                }
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
            Integer del = activitiesRepository.del(ids);
            timeARepository.del(ids);
        }
        return BaseResult.success("successfully");
    }

    public BaseResult find(JSONObject jsonObject) {
        Activities activities = JSONObject.toJavaObject(jsonObject, Activities.class);
        Integer pageNo = jsonObject.getInteger("pageNo");
        Integer pageSize = jsonObject.getInteger("pageSize");
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Specification<Activities> querySpecifi = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (null!=activities.getName()&&!"".equals(activities.getName())) {
                predicates.add(cb.like((root.get("name")), "%" +activities.getName() + "%"));
            }
            if (null!=activities.getVenueName()&&!"".equals(activities.getVenueName())) {
                predicates.add(cb.like((root.get("venueName")), "%" +activities.getVenueName() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Page<Activities> activitiess = activitiesRepository.findAll(querySpecifi, pageable);
        return BaseResult.success(activitiess);
    }
}
