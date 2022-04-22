package io.renren.modules.bigtian.controller;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import cn.hutool.core.collection.CollUtil;
import com.alibaba.fastjson.JSON;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.bigtian.entity.GymnasiumTypeEntity;
import io.renren.modules.bigtian.service.GymnasiumTypeService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * 体育馆类型表
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 11:00:55
 */
@RestController
@RequestMapping("bigtian/gymnasiumtype")
public class GymnasiumTypeController {
    @Autowired
    private GymnasiumTypeService gymnasiumTypeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        PageUtils page = gymnasiumTypeService.queryPage(params);

        return R.ok().put("page", page);
    }

    @RequestMapping("/getByIds")
    public R getByIds(@RequestParam("ids") String ids) {
        List<String> list = gymnasiumTypeService
                .listByIds(Arrays.asList(ids.split(",")))
                .stream()
                .map(GymnasiumTypeEntity::getType)
                .collect(Collectors.toList());
        return R.ok(CollUtil.join(list, ","));
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
        GymnasiumTypeEntity gymnasiumType = gymnasiumTypeService.getById(id);

        return R.ok().put("gymnasiumType", gymnasiumType);
    }


    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody GymnasiumTypeEntity gymnasiumType) {
        gymnasiumTypeService.save(gymnasiumType);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody GymnasiumTypeEntity gymnasiumType) {
        gymnasiumTypeService.updateById(gymnasiumType);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids) {
        gymnasiumTypeService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
