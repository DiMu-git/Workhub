package com.work.workhub.job;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;
import java.io.File;
import java.io.IOException;

/**
 * @author mz
 * @date 2022/4/7
 * @description
 */
@Component
@Order(0)
public class Init implements CommandLineRunner {

    public static String path;
    static {
        try {
            path=new File("").getCanonicalPath().replace("\\","/")+"/pic/";
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        //指定文件代销
        factory.setMaxFileSize(DataSize.ofMegabytes(10));
        /// 设定上传文件大小
        factory.setMaxRequestSize(DataSize.ofMegabytes(10));
        return factory.createMultipartConfig();
    }
    @Override
    public void run(String... args) throws Exception {

        System.out.printf("");
    }
}
