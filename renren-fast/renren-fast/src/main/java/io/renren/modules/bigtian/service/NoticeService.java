package io.renren.modules.bigtian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.bigtian.entity.NoticeEntity;

import java.util.Map;

/**
 * 公告内容
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-10 19:39:49
 */
public interface NoticeService extends IService<NoticeEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

