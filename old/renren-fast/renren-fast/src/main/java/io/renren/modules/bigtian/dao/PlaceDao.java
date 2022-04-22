package io.renren.modules.bigtian.dao;

import io.renren.modules.bigtian.entity.PlaceEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.Map;

/**
 * 场地
 * 
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-10 09:03:34
 */
@Mapper
public interface PlaceDao extends BaseMapper<PlaceEntity> {

    Map<String, BigDecimal> getMaxAndMin(Integer id);
}
