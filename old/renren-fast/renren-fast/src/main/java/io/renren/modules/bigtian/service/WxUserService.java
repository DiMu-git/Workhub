package io.renren.modules.bigtian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.bigtian.entity.WxUserEntity;

import java.util.Map;

/**
 * 微信用户表
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 10:23:09
 */
public interface WxUserService extends IService<WxUserEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

