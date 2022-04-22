package io.renren.modules.bigtian.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

/**
 * 体育馆类型表
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 11:00:55
 */
@Data
@TableName("gymnasium_type")
public class GymnasiumTypeEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId
    private Integer id;
    /**
     * 名称
     */
    private String type;

    /**
     * 图标
     */
    private String icon;
}
