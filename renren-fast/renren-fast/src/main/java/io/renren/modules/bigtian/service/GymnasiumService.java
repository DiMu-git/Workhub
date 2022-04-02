package io.renren.modules.bigtian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.bigtian.entity.GymnasiumEntity;

import java.util.Map;

/**
 * 体育馆
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 10:55:21
 */
public interface GymnasiumService extends IService<GymnasiumEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

