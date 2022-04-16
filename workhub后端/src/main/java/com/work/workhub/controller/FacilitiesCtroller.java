package com.work.workhub.controller;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.Facilities;
import com.work.workhub.service.FacilitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author md
 * @date 2022/4/6
 * @description
 */

@RestController
@RequestMapping("/facilities")
@CrossOrigin
public class FacilitiesCtroller {
    @Autowired
    FacilitiesService facilitiesService;

    @PostMapping("/edit")
    public BaseResult edit(@RequestBody Facilities facilities){

        return facilitiesService.edit(facilities);
    }

    @PostMapping("/del")
    public BaseResult del(@RequestBody List<String> ids){

        return facilitiesService.del(ids);
    }

    @PostMapping("/find")
    public BaseResult find(@RequestBody JSONObject jsonObject){

        return facilitiesService.find(jsonObject);
    }
}
