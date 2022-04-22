package com.work.workhub.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * @author md
 * @date 2022/4/6
 * @description s
 */

@Data
@Entity
@Table
public class Facilities {
    @Id
    String id;

    @Column
    String venueId;

    @Column
    String venueName;

    @Column
    String name;

    @Column
    Integer num;

    @Column
    Double price;

    @Column
    String remark;

    @Column
    String startDate;

    @Column
    String endDate;


    @Column
    String url;

    @Column
    Integer type;

    @Column
    Date createTime;
}
