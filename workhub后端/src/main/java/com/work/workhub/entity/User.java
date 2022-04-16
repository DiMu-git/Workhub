package com.work.workhub.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * @author md
 * @date 2022/4/5
 * @description 用户
 */

@Data
@Entity
@Table
public class User {
    @Id
    String id;

    //头像url
    @Column
    String url;

    @Column
    String userName;

    @Column
    String nickName;

    @Column
    String password;

    @Column
    String tel;

    @Column
    String address;

    @Column
    String mail;

    @Column
    String bank;
    @Column
    Integer userGender;
    @Column
    Integer vip;

    @Column
    Date createTime;


}
