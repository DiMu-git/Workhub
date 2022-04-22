package io.renren.modules.bigtian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.bigtian.entity.ReserveEntity;

import java.util.Map;

/**
 * 预约
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-12 16:38:56
 */
public interface ReserveService extends IService<ReserveEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

