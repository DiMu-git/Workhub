package com.work.workhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
public class WorkhubApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkhubApplication.class, args);
    }

}
