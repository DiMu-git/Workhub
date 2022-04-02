package com.md.learn.mapper;

import com.md.learn.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {


    @Select("SELECT * from sys_usr")
    List<User> findAll();


    @Insert("INSERT into sys_usr(username, password, nickname, email, phone, address)" +
            "VALUES (#{username}, #{password}, #{nickname}, #{email}, #{phone}, #{address})")
    int insert(User user);

    int update(User user);

    @Delete("delete from sys_usr where id = #{id}")
    Integer deleteById(@Param("id") Integer id);
}
