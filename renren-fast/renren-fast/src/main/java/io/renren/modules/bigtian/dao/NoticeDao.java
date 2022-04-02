package io.renren.modules.bigtian.dao;

import io.renren.modules.bigtian.entity.NoticeEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 公告内容
 * 
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-10 19:39:49
 */
@Mapper
public interface NoticeDao extends BaseMapper<NoticeEntity> {
	
}
