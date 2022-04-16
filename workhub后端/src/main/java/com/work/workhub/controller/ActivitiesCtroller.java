package com.work.workhub.controller;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.Activities;
import com.work.workhub.service.ActivitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author md
 * @date 2022/4/6
 * @description
 */

@RestController
@RequestMapping("/activities")
@CrossOrigin
public class ActivitiesCtroller {
    @Autowired
    ActivitiesService activitiesService;

    @PostMapping("/edit")
    public BaseResult edit(@RequestBody Activities activities){

        return activitiesService.edit(activities);

    }

    @PostMapping("/del")
    public BaseResult del(@RequestBody List<String> ids){

        return activitiesService.del(ids);
    }

    @PostMapping("/find")
    public BaseResult find(@RequestBody JSONObject jsonObject){

        return activitiesService.find(jsonObject);
    }
}
