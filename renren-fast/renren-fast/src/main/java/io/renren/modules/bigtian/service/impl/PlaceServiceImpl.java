package io.renren.modules.bigtian.service.impl;

import org.apache.commons.collections.MapUtils;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.bigtian.dao.PlaceDao;
import io.renren.modules.bigtian.entity.PlaceEntity;
import io.renren.modules.bigtian.service.PlaceService;


@Service("placeService")
public class PlaceServiceImpl extends ServiceImpl<PlaceDao, PlaceEntity> implements PlaceService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        QueryWrapper<PlaceEntity> wrapper = new QueryWrapper<>();
        if (params.containsKey("name")) {
            wrapper.like("name", MapUtils.getString(params, "name"));
        }
        if (params.containsKey("parentId")) {
            wrapper.eq("parent_id", MapUtils.getInteger(params, "parentId"));
        }
        if (params.containsKey("typeId")) {
            wrapper.eq("type_id", MapUtils.getInteger(params, "typeId"));
        }

        IPage<PlaceEntity> page = this.page(
                new Query<PlaceEntity>().getPage(params),
                wrapper
        );

        return new PageUtils(page);
    }

    @Override
    public Map<String, BigDecimal> getMaxAndMin(Integer id) {
        return baseMapper.getMaxAndMin(id);
    }

}