package io.renren.modules.bigtian.controller;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.modules.bigtian.entity.ReserveEntity;
import io.renren.modules.sys.controller.AbstractController;
import io.renren.modules.sys.entity.SysUserEntity;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.bigtian.service.ReserveService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * 预约
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-12 16:38:56
 */
@RestController
@RequestMapping("/bigtians/reserve")
public class ReserveController extends AbstractController {
    @Autowired
    private ReserveService reserveService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        PageUtils page = reserveService.queryPage(params);

        return R.ok().put("page", page);
    }

    @RequestMapping("/listByUserId")
    public R listByUserId(@RequestParam Map<String, Object> params) {
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("user_id", getUserId());
        List<ReserveEntity> list = reserveService.list(wrapper);
        Map<String, List<ReserveEntity>> collect = list.stream().collect(Collectors.groupingBy(el -> el.getStatus() + ""));
        Map<String, List<ReserveEntity>> dataMap = new HashMap<>();
        dataMap.put("all", list);
        dataMap.put("zero", collect.get("0"));
        dataMap.put("one", collect.get("1"));
        dataMap.put("two", collect.get("2"));
        return R.ok().put("page", dataMap);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
        ReserveEntity reserve = reserveService.getById(id);

        return R.ok().put("reserve", reserve);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody ReserveEntity reserve) {
        reserve.setUserId(getUser().getUserId().intValue());
        reserveService.save(reserve);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody ReserveEntity reserve) {
        reserveService.updateById(reserve);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids) {
        reserveService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
