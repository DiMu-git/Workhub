package io.renren.modules.bigtian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.bigtian.entity.PlaceEntity;

import java.math.BigDecimal;
import java.util.Map;

/**
 * 场地
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-10 09:03:34
 */
public interface PlaceService extends IService<PlaceEntity> {

    PageUtils queryPage(Map<String, Object> params);

    Map<String, BigDecimal> getMaxAndMin(Integer id);

}

