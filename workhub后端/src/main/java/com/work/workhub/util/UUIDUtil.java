package com.work.workhub.util;

import java.util.UUID;

/**
 * @author mz
 * @date 2022/4/7
 * @description
 */
public class UUIDUtil {
    public static String uuid(){
        return UUID.randomUUID().toString().replace("-","");
    }

}
