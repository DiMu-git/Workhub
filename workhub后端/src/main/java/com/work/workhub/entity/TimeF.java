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
public class TimeF {
    @Id
    String id;

    @Column
    String pId;

    @Column
    Double price;

    @Column
    Integer maxNum;

    @Column
    Integer nums;

    @Column
    String time;
}
