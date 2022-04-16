package com.work.workhub.controller;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.Venue;
import com.work.workhub.service.VenulService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author mz
 * @date 2022/4/6
 * @description
 */

@RestController
@RequestMapping("/venue")
@CrossOrigin
public class VenueCtroller {

    @Autowired
    VenulService venulService;

    @PostMapping("/edit")
    public BaseResult edit(@RequestBody Venue venue){

        return venulService.edit(venue);
    }

    @PostMapping("/del")
    public BaseResult del(@RequestBody List<String> ids){

        return venulService.del(ids);
    }

    @PostMapping("/find")
    public BaseResult find(@RequestBody JSONObject jsonObject){

        return venulService.find(jsonObject);
    }

    @PostMapping("/list")
    public BaseResult list(){

        return venulService.list();
    }

    @GetMapping("/getList")
    public BaseResult getList(@RequestParam(value = "id")String id){

        return venulService.getList(id);
    }

    @GetMapping("/getListByTime")
    public BaseResult getListByTime(@RequestParam(value = "startDate")String startDate,@RequestParam(value = "endDate")String endDate){

        return venulService.getListByTime(startDate,endDate);
    }

    @GetMapping("/getTimes")
    public BaseResult getTimes(@RequestParam(value = "id")String id,@RequestParam(value = "type")int type){

        return venulService.getTimes(id,type);
    }
}
