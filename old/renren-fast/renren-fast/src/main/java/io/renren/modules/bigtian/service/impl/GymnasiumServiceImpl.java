package io.renren.modules.bigtian.service.impl;

import org.apache.commons.collections.MapUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.bigtian.dao.GymnasiumDao;
import io.renren.modules.bigtian.entity.GymnasiumEntity;
import io.renren.modules.bigtian.service.GymnasiumService;


@Service("gymnasiumService")
public class GymnasiumServiceImpl extends ServiceImpl<GymnasiumDao, GymnasiumEntity> implements GymnasiumService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        QueryWrapper<GymnasiumEntity> wrapper = new QueryWrapper<>();
        if (params.containsKey("key")) {
            wrapper.like("gymnasium", MapUtils.getString(params, "key"));
        }
        if (params.containsKey("type")) {
            wrapper.apply("FIND_IN_SET({0},type)",MapUtils.getString(params,"type"));
        }

        IPage<GymnasiumEntity> page = this.page(
                new Query<GymnasiumEntity>().getPage(params),
                wrapper
        );

        return new PageUtils(page);
    }

}