package com.work.workhub.controller;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.User;
import com.work.workhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author md
 * @date 2022/4/5
 * @description
 */
@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/edit")
    public BaseResult edit(@RequestBody User user){

        return userService.edit(user);
    }

    @PostMapping("/login")
    public BaseResult login(@RequestBody User user){

        return userService.login(user);
    }

    @PostMapping("/del")
    public BaseResult del(@RequestBody List<String> ids){

        return userService.del(ids);
    }

    @PostMapping("/find")
    public BaseResult find(@RequestBody JSONObject jsonObject){

        return userService.find(jsonObject);
    }

    @PostMapping("/changePassword")
    public BaseResult changePassword(@RequestBody User user){

        return userService.changePassword(user);
    }

    @GetMapping("/get")
    public BaseResult get(@RequestParam(value = "id") String id){

        return userService.get(id);
    }

    @PostMapping("/vip")
    public BaseResult vip(@RequestBody User user){

        return userService.vip(user);
    }
}
