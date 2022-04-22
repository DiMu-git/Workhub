package io.renren.modules.bigtian.service.impl;

import org.apache.commons.collections.MapUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.bigtian.dao.WxUserDao;
import io.renren.modules.bigtian.entity.WxUserEntity;
import io.renren.modules.bigtian.service.WxUserService;


@Service("wxUserService")
public class WxUserServiceImpl extends ServiceImpl<WxUserDao, WxUserEntity> implements WxUserService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<WxUserEntity> page = this.page(
                new Query<WxUserEntity>().getPage(params),
                new QueryWrapper<WxUserEntity>().like("nick_name", MapUtils.getString(params, "key"))
        );

        return new PageUtils(page);
    }

}