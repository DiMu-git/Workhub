package com.work.workhub.service;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.User;

import java.util.List;

/**
 * @author md
 * @date 2022/4/7
 * @description
 */
public interface UserService {
    BaseResult edit(User user);

    BaseResult del(List<String> ids);

    BaseResult find(JSONObject jsonObject);

    BaseResult login(User user);

    BaseResult changePassword(User user);

    BaseResult vip(User user);

    BaseResult get(String id);
}
