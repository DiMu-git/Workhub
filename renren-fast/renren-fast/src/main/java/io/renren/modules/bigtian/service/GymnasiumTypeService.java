package io.renren.modules.bigtian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.bigtian.entity.GymnasiumTypeEntity;

import java.util.Map;

/**
 * 体育馆类型表
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 11:00:55
 */
public interface GymnasiumTypeService extends IService<GymnasiumTypeEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

