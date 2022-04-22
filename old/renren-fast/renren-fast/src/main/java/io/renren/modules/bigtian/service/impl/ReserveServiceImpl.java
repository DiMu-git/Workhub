package io.renren.modules.bigtian.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.common.utils.PropertyToColumnUtils;

import io.renren.modules.bigtian.dao.ReserveDao;
import io.renren.modules.bigtian.entity.ReserveEntity;
import io.renren.modules.bigtian.service.ReserveService;


@Service("reserveService")
public class ReserveServiceImpl extends ServiceImpl<ReserveDao, ReserveEntity> implements ReserveService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<ReserveEntity> page = this.page(
                new Query<ReserveEntity>().getPage(params),
                PropertyToColumnUtils.getParams(new QueryWrapper<ReserveEntity>(), params)
        );

        return new PageUtils(page);
    }

}