package com.work.workhub.config;

import com.work.workhub.job.Init;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author md
 * @date 2022/4/7
 * @description
 */
@Configuration
public class GoWebMvcConfigurerAdapter extends WebMvcConfigurerAdapter {


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //配置静态资源处理
        registry.addResourceHandler("/pic/*")
                .addResourceLocations("file:"+ Init.path);
    }
}
