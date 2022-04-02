package io.renren.modules.bigtian.dao;

import io.renren.modules.bigtian.entity.WxUserEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 微信用户表
 * 
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 10:23:09
 */
@Mapper
public interface WxUserDao extends BaseMapper<WxUserEntity> {
	
}
