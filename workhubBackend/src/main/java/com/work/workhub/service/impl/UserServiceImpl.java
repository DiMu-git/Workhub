package com.work.workhub.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.User;
import com.work.workhub.repository.UserRepository;
import com.work.workhub.service.UserService;
import com.work.workhub.util.MD5Util;
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
 * @author md
 * @date 2022/4/6
 * @description
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public BaseResult edit(User user) {
        try {
            String userName = user.getUserName();
            if(null==userName||"".equals(userName)){
                return BaseResult.error("-1","User name cannot be empty");
            }

            User byUserName = userRepository.getByUserName(userName);

            String id = user.getId();
            if(null==id||"".equals(id)){
                if(Objects.nonNull(byUserName)){
                    return BaseResult.error("-1","User name already exists");
                }
                user.setId(UUIDUtil.uuid());
                user.setCreateTime(new Date());
                user.setVip(0);
                user.setPassword(MD5Util.md5(null==user.getPassword()?"888888":user.getPassword()));
            }else {
                if(Objects.nonNull(byUserName)&&!id.equals(byUserName.getId())){
                    return BaseResult.error("-1","User name already exists");
                }
                User byId = userRepository.getById(id);
                if(Objects.isNull(byId)){
                    user.setId(UUIDUtil.uuid());
                    user.setCreateTime(new Date());
                    user.setVip(0);
                    user.setPassword(MD5Util.md5(null==user.getPassword()?"888888":user.getPassword()));
                }else {
                    user.setPassword(byId.getPassword());
                    user.setCreateTime(byId.getCreateTime());
                }

            }

            userRepository.save(user);
            return BaseResult.success(user);

        }catch (Exception e){
            e.printStackTrace();
            return BaseResult.error("-1","Edit user exception");
        }
    }

    @Override
    public BaseResult del(List<String> ids) {
        if(null!=ids&&ids.size()>0){
            Integer del = userRepository.del(ids);
        }
        return BaseResult.success("successfully");
    }

    @Override
    public BaseResult find(JSONObject jsonObject) {
        
        User user = JSONObject.toJavaObject(jsonObject, User.class);
        Integer pageNo = jsonObject.getInteger("pageNo");
        Integer pageSize = jsonObject.getInteger("pageSize");
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Specification<User> querySpecifi = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (null!=user.getUserName()&&!"".equals(user.getUserName())) {
                predicates.add(cb.like((root.get("userName")), "%" +user.getUserName() + "%"));
            }

            if (null!=user.getNickName()&&!"".equals(user.getNickName())) {
                predicates.add(cb.like((root.get("nickName")), "%" +user.getNickName() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Page<User> users = userRepository.findAll(querySpecifi, pageable);
        return BaseResult.success(users);
    }

    @Override
    public BaseResult login(User user) {
        User login = userRepository.login(user.getUserName(), MD5Util.md5(user.getPassword()));
        if(null!=login){
            return BaseResult.success(login);
        }
        return BaseResult.error("-1","用户名或密码错误");
    }

    @Override
    public BaseResult changePassword(User user) {
        userRepository.changePassword(user.getId(),MD5Util.md5(user.getPassword()));
        return BaseResult.success("successfully");
    }

    @Override
    public BaseResult vip(User user) {
        userRepository.vip(user.getId(),user.getVip());
        return BaseResult.success("successfully");
    }

    @Override
    public BaseResult get(String id) {
        User user = userRepository.getById(id);
        if(null==user){
            user=new User();
            user.setId(id);
            user.setNickName("tourist");
            user.setCreateTime(new Date());
            user.setVip(0);
            userRepository.save(user);
        }
        return BaseResult.success(user);
    }
}
