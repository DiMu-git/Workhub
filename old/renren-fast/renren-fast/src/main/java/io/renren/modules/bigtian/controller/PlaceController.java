package io.renren.modules.bigtian.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.modules.bigtian.entity.GymnasiumEntity;
import io.renren.modules.bigtian.entity.GymnasiumTypeEntity;
import io.renren.modules.bigtian.entity.ReserveEntity;
import io.renren.modules.bigtian.service.GymnasiumService;
import io.renren.modules.bigtian.service.GymnasiumTypeService;
import io.renren.modules.bigtian.service.ReserveService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.bigtian.entity.PlaceEntity;
import io.renren.modules.bigtian.service.PlaceService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * 场地
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-10 09:03:34
 */
@RestController
@RequestMapping("bigtian/place")
public class PlaceController {
    @Autowired
    private PlaceService placeService;
    @Autowired
    private GymnasiumTypeService typeService;
    @Autowired
    private GymnasiumService gymnasiumService;
    @Autowired
    private ReserveService reserveService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        PageUtils page = placeService.queryPage(params);
        Map<Integer, String> typeMap = typeService
                .list()
                .stream()
                .collect(Collectors.toMap(GymnasiumTypeEntity::getId, GymnasiumTypeEntity::getType));
        Map<Integer, String> gymMap = gymnasiumService
                .list()
                .stream()
                .collect(Collectors.toMap(GymnasiumEntity::getId, GymnasiumEntity::getGymnasium));
        List<PlaceEntity> list = (List<PlaceEntity>) page.getList();
        list.forEach(el -> {
            el.setTypeName(typeMap.get(el.getTypeId()));
            el.setGymnasiumName(gymMap.get(el.getParentId()));
        });
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
        PlaceEntity place = placeService.getById(id);
        place.setType(typeService.getById(place.getTypeId()));
        QueryWrapper<ReserveEntity> wrapper = new QueryWrapper();
        wrapper.apply("TO_DAYS(reserve_time)=TO_DAYS({0})", new Date());
        List<Date> times = reserveService.list(wrapper).stream().map(ReserveEntity::getReserveTime).collect(Collectors.toList());
        place.setTimes(times);
        return R.ok().put("place", place);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody PlaceEntity place) {
        placeService.save(place);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody PlaceEntity place) {
        placeService.updateById(place);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids) {
        placeService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
