package com.work.workhub.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author md
 * @date 2022/4/5
 * @description
 */
@Controller
public class WebController {

    @GetMapping("/index")
    public String index(){
        return "index";
    }
}
