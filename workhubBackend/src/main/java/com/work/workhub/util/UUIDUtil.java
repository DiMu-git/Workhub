package com.work.workhub.util;

import java.util.UUID;

/**
 * @author md
 * @date 2022/4/7
 * @description
 */
public class UUIDUtil {
    public static String uuid(){
        return UUID.randomUUID().toString().replace("-","");
    }

}
