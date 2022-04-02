package io.renren.modules.bigtian.service.impl;

import org.apache.commons.collections.MapUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.bigtian.dao.GymnasiumTypeDao;
import io.renren.modules.bigtian.entity.GymnasiumTypeEntity;
import io.renren.modules.bigtian.service.GymnasiumTypeService;


@Service("gymnasiumTypeService")
public class GymnasiumTypeServiceImpl extends ServiceImpl<GymnasiumTypeDao, GymnasiumTypeEntity> implements GymnasiumTypeService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        QueryWrapper<GymnasiumTypeEntity> wrapper = new QueryWrapper<GymnasiumTypeEntity>();
        if (params.containsKey("key")) {
            wrapper.like("type", MapUtils.getString(params, "key"));
        }
        IPage<GymnasiumTypeEntity> page = this.page(
                new Query<GymnasiumTypeEntity>().getPage(params),
                wrapper
        );

        return new PageUtils(page);
    }

}