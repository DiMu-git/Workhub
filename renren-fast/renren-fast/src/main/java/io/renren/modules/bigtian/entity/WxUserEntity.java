package io.renren.modules.bigtian.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 微信用户表
 * 
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 10:23:09
 */
@Data
@TableName("wx_user")
public class WxUserEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 微信openid
	 */
	private String wxOpenId;
	/**
	 * 昵称
	 */
	private String nickName;
	/**
	 * 手机号
	 */
	private String phone;
	/**
	 * 真实姓名
	 */
	private String realName;
	/**
	 * 身份证号
	 */
	private String identityCard;
	/**
	 * 0：女，1：男
	 */
	private Integer sex;

}
