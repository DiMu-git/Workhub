package com.work.workhub.job;

import org.hibernate.annotations.Comment;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

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

    @Override
    public void run(String... args) throws Exception {

        System.out.printf("");
    }
}
