package io.renren.modules.bigtian.service.impl;

import io.renren.common.utils.PropertyToColumnUtils;
import org.apache.commons.collections.MapUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.bigtian.dao.NoticeDao;
import io.renren.modules.bigtian.entity.NoticeEntity;
import io.renren.modules.bigtian.service.NoticeService;


@Service("noticeService")
public class NoticeServiceImpl extends ServiceImpl<NoticeDao, NoticeEntity> implements NoticeService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<NoticeEntity> page = this.page(
                new Query<NoticeEntity>().getPage(params),
                PropertyToColumnUtils.getParams(new QueryWrapper<>(), params)
        );

        return new PageUtils(page);
    }

}