package com.md.learn.controller;

import com.md.learn.entity.User;
import com.md.learn.mapper.UserMapper;
import com.md.learn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;
    @PostMapping
    public Integer save(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/")
    public List<User> index() {
        return userMapper.findAll();
    }


    @DeleteMapping("/{id}")
    public Integer delete(@PathVariable Integer id) {
        return userMapper.deleteById(id);
    }
}
