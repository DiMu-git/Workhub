package io.renren.modules.bigtian.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.math.BigDecimal;
import java.io.Serializable;
import java.util.Date;

import lombok.Data;

/**
 * 预约
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-12 16:38:56
 */
@Data
@TableName("reserve")
public class ReserveEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @TableId
    private Integer id;
    /**
     * 用户id
     */
    private Integer userId;
    /**
     * 预约时间
     */
    private Date reserveTime;
    /**
     * 0:未支付，1：已支付，2：取消
     */
    private Integer status;
    /**
     * 场地id
     */
    private Integer placeId;
    /**
     * 价格
     */
    private BigDecimal price;
    /**
     * 名称
     */
    private String placeName;
    private String images;
}
