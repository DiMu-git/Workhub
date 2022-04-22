/**
 * Copyright (c) 2016-2019 人人开源 All rights reserved.
 * <p>
 * https://www.renren.io
 * <p>
 * 版权所有，侵权必究！
 */

package io.renren.modules.sys.controller;

import cn.hutool.core.util.IdcardUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.annotation.SysLog;
import io.renren.common.utils.Constant;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import io.renren.common.validator.Assert;
import io.renren.common.validator.ValidatorUtils;
import io.renren.common.validator.group.AddGroup;
import io.renren.common.validator.group.UpdateGroup;
import io.renren.modules.bigtian.entity.WxUserEntity;
import io.renren.modules.bigtian.service.WxUserService;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.form.PasswordForm;
import io.renren.modules.sys.service.SysUserRoleService;
import io.renren.modules.sys.service.SysUserService;
import io.renren.modules.sys.service.SysUserTokenService;
import org.apache.commons.lang.ArrayUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

/**
 * 系统用户
 *
 * @author Mark sunlightcs@gmail.com
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserController extends AbstractController {
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserRoleService sysUserRoleService;
    @Autowired
    private SysUserTokenService sysUserTokenService;
    @Autowired
    private WxUserService wxUserService;


    /**
     * 所有用户列表
     */
    @GetMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //只有超级管理员，才能查看所有管理员列表
        if (getUserId() != Constant.SUPER_ADMIN) {
            params.put("createUserId", getUserId());
        }
        PageUtils page = sysUserService.queryPage(params);

        return R.ok().put("page", page);
    }

    /**
     * 获取登录的用户信息
     */
    @GetMapping("/info")
    public R info() {
        return R.ok().put("user", getUser());
    }

    /**
     * 修改登录用户密码
     */
    @SysLog("修改密码")
    @PostMapping("/password")
    public R password(@RequestBody PasswordForm form) {
        Assert.isBlank(form.getNewPassword(), "新密码不为能空");

        //sha256加密
        String password = new Sha256Hash(form.getPassword(), getUser().getSalt()).toHex();
        //sha256加密
        String newPassword = new Sha256Hash(form.getNewPassword(), getUser().getSalt()).toHex();

        //更新密码
        boolean flag = sysUserService.updatePassword(getUserId(), password, newPassword);
        if (!flag) {
            return R.error("原密码不正确");
        }

        return R.ok();
    }

    /**
     * 用户信息
     */
    @GetMapping("/info/{userId}")
    public R info(@PathVariable("userId") Long userId) {
        SysUserEntity user = sysUserService.getById(userId);
        //获取用户所属的角色列表
        List<Long> roleIdList = sysUserRoleService.queryRoleIdList(userId);
        user.setRoleIdList(roleIdList);
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("wx_open_id", user.getUsername());
        WxUserEntity one = wxUserService.getOne(wrapper);
        if (Objects.nonNull(one)) {
            user.setNickName(one.getNickName());
            user.setRealName(one.getRealName());
            user.setIdentityCard(one.getIdentityCard());
            user.setSex(one.getSex());
        }
        return R.ok().put("user", user);
    }


    /**
     * 保存用户
     */
    @PostMapping("/save")
    @Transactional
    public R save(@RequestBody SysUserEntity user) {
        SysUserEntity userEntity = sysUserService.getOne(new QueryWrapper<SysUserEntity>().eq("username", user.getUsername()));
        if (Objects.nonNull(userEntity)) {
            user = userEntity;
        }
        if (Objects.isNull(user.getUserId())) {
            WxUserEntity wxUserEntity = new WxUserEntity();
            wxUserEntity.setNickName(user.getPassword());
            wxUserEntity.setWxOpenId(user.getUsername());
            wxUserEntity.setSex(user.getSex());
            wxUserService.save(wxUserEntity);
            if (user.getUsername() == null) {
                user.setCreateUserId(1L);

                user.setPassword(new Sha256Hash("123456", user.getSalt()).toHex());
            }
            user.setStatus(1);
            ValidatorUtils.validateEntity(user, AddGroup.class);
            sysUserService.saveUser(user);
        }
        return sysUserTokenService.createToken(user.getUserId()).put("id", user.getUserId());
    }

    /**
     * 修改用户
     */
    @SysLog("修改用户")
    @PostMapping("/update")
    public R update(@RequestBody SysUserEntity user) {
        ValidatorUtils.validateEntity(user, UpdateGroup.class);
        user.setCreateUserId(getUserId());
        sysUserService.update(user);
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("wx_open_id", user.getUsername());
        WxUserEntity one = wxUserService.getOne(wrapper);
        if (Objects.nonNull(one)) {
            one.setNickName(user.getNickName());
            one.setSex(user.getSex());
            one.setRealName(user.getRealName());
            one.setIdentityCard(user.getIdentityCard());
            wxUserService.updateById(one);
        }
        return R.ok();
    }

    /**
     * 删除用户
     */
    @SysLog("删除用户")
    @PostMapping("/delete")
    public R delete(@RequestBody Long[] userIds) {
        if (ArrayUtils.contains(userIds, 1L)) {
            return R.error("系统管理员不能删除");
        }

        if (ArrayUtils.contains(userIds, getUserId())) {
            return R.error("当前用户不能删除");
        }

        sysUserService.deleteBatch(userIds);

        return R.ok();
    }
}
