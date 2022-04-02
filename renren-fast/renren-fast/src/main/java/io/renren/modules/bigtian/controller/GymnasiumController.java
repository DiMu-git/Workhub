package io.renren.modules.bigtian.controller;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.modules.bigtian.entity.GymnasiumTypeEntity;
import io.renren.modules.bigtian.service.GymnasiumTypeService;
import io.renren.modules.bigtian.service.PlaceService;
import org.apache.commons.collections.MapUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.bigtian.entity.GymnasiumEntity;
import io.renren.modules.bigtian.service.GymnasiumService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * 体育馆
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 10:55:21
 */
@RestController
@RequestMapping("bigtian/gymnasium")
public class GymnasiumController {
    @Autowired
    private GymnasiumService gymnasiumService;
    @Autowired
    private GymnasiumTypeService gymnasiumTypeService;
    @Autowired
    private PlaceService placeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        Map<String, String> typeMap = gymnasiumTypeService.list()
                .stream()
                .collect(Collectors.toMap(el -> el.getId().toString(), GymnasiumTypeEntity::getType));
        PageUtils page = gymnasiumService.queryPage(params);
        List<GymnasiumEntity> list = (List<GymnasiumEntity>) page.getList();
        List<String> typeName = null;
        Map<String, BigDecimal> maxMap = null;
        BigDecimal max;
        BigDecimal min;
        for (GymnasiumEntity entity : list) {
            maxMap = placeService.getMaxAndMin(entity.getId());
            if (Objects.nonNull(maxMap)) {
                max = maxMap.get("max");
                min = maxMap.get("min");
                if (max.compareTo(min) != 0) {
                    entity.setPrice(min + "——" + max);
                } else {
                    entity.setPrice(min.toString());
                }
            }
            typeName = new ArrayList<>();
            String[] types = entity.getType().split(",");
            for (String type : types) {
                typeName.add(MapUtils.getString(typeMap, type));
            }
            entity.setList(gymnasiumTypeService.listByIds(Arrays.asList(types)));
            entity.setType(CollUtil.join(typeName, ","));
        }
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
        GymnasiumEntity gymnasium = gymnasiumService.getById(id);
        Map<String, BigDecimal> maxMap = placeService.getMaxAndMin(gymnasium.getId());
        if (Objects.nonNull(maxMap)) {
            BigDecimal max = maxMap.get("max");
            BigDecimal min = maxMap.get("min");
            if (max.compareTo(min) != 0) {
                gymnasium.setPrice(min + "——" + max);
            } else {
                gymnasium.setPrice(min.toString());
            }
        }
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("parent_id", gymnasium.getId());
        gymnasium.setChildrens(placeService.list(wrapper));
        gymnasium.setList(gymnasiumTypeService.listByIds(Arrays.asList(gymnasium.getType().split(","))));
        return R.ok().put("gymnasium", gymnasium);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody GymnasiumEntity gymnasium) {
        gymnasiumService.save(gymnasium);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody GymnasiumEntity gymnasium) {
        gymnasiumService.updateById(gymnasium);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids) {
        gymnasiumService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
