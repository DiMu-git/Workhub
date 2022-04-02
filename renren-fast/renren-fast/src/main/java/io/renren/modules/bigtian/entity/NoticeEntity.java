package io.renren.modules.bigtian.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 公告内容
 * 
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-10 19:39:49
 */
@Data
@TableName("notice")
public class NoticeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * id
	 */
	@TableId
	private Integer id;
	/**
	 * 公告名称
	 */
	private String name;
	/**
	 * 公告内容
	 */
	private String content;

}
