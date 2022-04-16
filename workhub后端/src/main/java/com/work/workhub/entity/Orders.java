package com.work.workhub.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author md
 * @date 2022/4/6
 * @description
 */

@Data
@Entity
@Table
public class Orders {

    @Id
    String id;

    @Column
    String code;

    @Column
    String userId;

    @Column
    String userName;

    @Column
    String time;

    @Column
    String timeType;

    @Column
    Double price;

    @Column
    String venueId;

    @Column
    String venueName;

    @Column
    String pid;

    @Column
    String name;
    /**
     * 0、已使用；1、已付款；2、未付款；3、已退款；-1、预约失败
     */
    @Column
    Integer flag;

}
