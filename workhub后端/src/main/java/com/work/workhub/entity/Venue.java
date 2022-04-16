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
     * @description
     */

    @Data
    @Entity
    @Table
    public class Venue {
        @Id
        String id;

        @Column
        String name;

        @Column
        String address;

        @Column
        String url;

        @Column
        Date createTime;
}
