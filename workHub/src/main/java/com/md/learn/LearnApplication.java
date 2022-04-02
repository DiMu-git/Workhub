package com.md.learn;

import com.md.learn.entity.User;
import com.md.learn.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@SpringBootApplication
public class LearnApplication {


    public static void main(String[] args) {
        SpringApplication.run(LearnApplication.class, args);
    }

}
