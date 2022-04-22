package com.work.workhub.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author mz
 * @date 2022/4/6
 * @description
 */

@Data
@Entity
@Table
public class TimeA {
    @Id
    String id;

    @Column
    String pId;

    @Column
    Double price;

//    @Column
//    Integer morning;
//
//    @Column
//    Integer morningNums;
//
//    @Column
//    Integer afternoon;
//
//    @Column
//    Integer afternoonNums;
//
//    @Column
//    Integer night;
//
//    @Column
//    Integer nightNums;

    //最大数量，时间段，剩余数量
    @Column
    Integer num;

    @Column
    String duringTime;

    @Column
    Integer remainNum;

    @Column
    Integer status;

    @Column
    String time;
}
