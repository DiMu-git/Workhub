package com.work.workhub.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * @author mz
 * @date 2022/4/6
 * @description
 */

@Data
@Entity
@Table
public class Activities {
    @Id
    String id;

    @Column
    String venueId;

    @Column
    String venueName;

    @Column
    String name;

    @Column
    String address;

    @Column
    String remark;

    @Column
    String startDate;

    @Column
    String endDate;

    @Column
    String url;

    @Column
    Double price;

    @Column
    Integer morning;


    @Column
    Integer afternoon;

    @Column
    Integer night;

    @Column
    Integer type;

    @Column
    Date createTime;
}
