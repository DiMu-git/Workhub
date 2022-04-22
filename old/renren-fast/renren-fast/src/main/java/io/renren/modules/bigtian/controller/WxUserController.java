package io.renren.modules.bigtian.controller;

import java.util.Arrays;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.bigtian.entity.WxUserEntity;
import io.renren.modules.bigtian.service.WxUserService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 微信用户表
 *
 * @author bigtian
 * @email 7990497@qq.com
 * @date 2021-04-09 10:23:09
 */
@RestController
@RequestMapping("bigtian/wxuser")
public class WxUserController {
    @Autowired
    private WxUserService wxUserService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = wxUserService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id){
		WxUserEntity wxUser = wxUserService.getById(id);

        return R.ok().put("wxUser", wxUser);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody WxUserEntity wxUser){
		wxUserService.save(wxUser);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody WxUserEntity wxUser){
		wxUserService.updateById(wxUser);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids){
		wxUserService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
