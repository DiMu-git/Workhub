package io.renren.modules.sys.controller;

import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import io.renren.common.utils.R;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sun.security.provider.MD5;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;


/**
 * @program: dining_room
 * @description: 微信扫码验证
 * @author: BigTian
 * @create: 2020-08-27 11:14
 */
@RestController
@RequestMapping("/weChat")
@Slf4j
public class WeChatController {
    @Value("${app_id}")
    private String appId;
    @Value("${mch_id}")
    private String mchId;
    @Value("${notify_url}")
    private String notifyUrl;
    @Value("${trade_type}")
    private String tradeType;
    @Value("${key}")
    private String key;
    @Value("${url}")
    private String url;
    @Value("${pay_url}")
    private String payUrl;


    @RequestMapping(value = "/ibXeaN2ZtR.txt")
    @ApiOperation(value = "微信检测是否包含此文件", notes = "微信扫描普通二维码跳转")
    public void sign(HttpServletResponse response) {
        response.setContentType("text/html");
        try {
            Resource resource = new ClassPathResource("ibXeaN2ZtR.txt");
            BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            PrintWriter writer = response.getWriter();
            writer.write(br.readLine());
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    @RequestMapping("/getOpenId")
    @ApiOperation(value = "获取客户端openId")
    public R getOpenId(@RequestParam("openId") String openId) {
        String result = HttpUtil.get(url + openId);
        log.info("openid微信返回值:{}", result);
        JSONObject jsonObject = JSON.parseObject(result);
        return R.ok(jsonObject);
    }



}
