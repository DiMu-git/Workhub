package io.renren.modules.bigtian.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Data;

/**
 * 体育馆
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 10:55:21
 */
@Data
@TableName("gymnasium")
public class GymnasiumEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId
    private Integer id;
    /**
     * 体育馆名称
     */
    private String gymnasium;
    /**
     * 场馆类型
     */
    private String type;
    /**
     * 场馆介绍
     */
    private String description;
    /**
     * 地址
     */
    private String address;
    /**
     * 经纬度
     */
    private String longitudeLatitude;

    /**
     * 图片
     */
    private String images;
    @TableField(exist = false)
    private List<GymnasiumTypeEntity> list;
    @TableField(exist = false)
    private String price;
    @TableField(exist = false)
    private List<PlaceEntity> childrens;
}
