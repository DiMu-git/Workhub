package io.renren.modules.bigtian.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.math.BigDecimal;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Data;

/**
 * 场地
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-10 09:03:34
 */
@Data
@TableName("place")
public class PlaceEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId
    private Integer id;
    /**
     * 体育馆id
     */
    private Integer parentId;
    /**
     * 预约费用
     */
    private BigDecimal price;
    /**
     * 场地描述
     */
    private String description;
    /**
     * 图片
     */
    private String images;
    /**
     * 名称
     */
    private String name;
    /**
     * 类型id
     */
    private Integer typeId;
    @TableField(exist = false)
    private String typeName;
    @TableField(exist = false)

    private String gymnasiumName;
    @TableField(exist = false)
    private GymnasiumTypeEntity type;
    @TableField(exist = false)
    private List<Date> times;
}
