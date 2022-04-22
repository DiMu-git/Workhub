package com.work.workhub.controller;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author md
 * @date 2022/4/6
 * @description
 */

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderCtroller {

    @Autowired
    OrderService orderService;

    @PostMapping("/find")
    public BaseResult find(@RequestBody JSONObject jsonObject){

        return orderService.find(jsonObject);
    }

    @GetMapping("/getOrdersByUser")
    public BaseResult getOrdersByUser(@RequestParam(value = "userId")String userId){

        return orderService.getOrdersByUser(userId);
    }

    @GetMapping("/refund")
    public BaseResult refund(@RequestParam(value = "id")String id){

        return orderService.refund(id);
    }

    @PostMapping("/pay")
    public BaseResult pay(@RequestBody JSONObject jsonObject){

        return orderService.pay(jsonObject);
    }

    @PostMapping("/sendOrder")
    public BaseResult sendOrder(@RequestBody JSONObject jsonObject){

        return orderService.sendOrder(jsonObject);
    }



    @GetMapping("/statistics")
    public BaseResult statistics(@RequestParam(value = "startDate")String startDate,@RequestParam(value = "endDate")String endDate){

        return orderService.statistics(startDate,endDate);
    }


}
