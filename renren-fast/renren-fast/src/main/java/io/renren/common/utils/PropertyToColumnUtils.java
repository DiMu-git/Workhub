package io.renren.common.utils;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import java.sql.Wrapper;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PropertyToColumnUtils {
    public static QueryWrapper getParams(QueryWrapper wrapper, Map<String, Object> params) {
        params.remove("page");
        params.remove("limit");
        params.remove("t");
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (value instanceof String && String.valueOf(value).length() > 0) {
                wrapper.like(propertyTransfer(key), value);
            } else if (value instanceof Long || value instanceof Integer) {
                wrapper.eq(propertyTransfer(key), value);
            } else if (value instanceof List) {
                wrapper.in(propertyTransfer(key), value);
            }
        }
        wrapper.orderByDesc("id");
        return wrapper;
    }

    /**
     * 根据属性名转成字段名
     *
     * @param params 属性名
     * @return
     */
    public static String propertyTransfer(String params) {
        Pattern pattern = Pattern.compile("[A-Z]");
        StringBuilder builder = new StringBuilder(params);
        Matcher mc = pattern.matcher(params);
        int index = 0;
        while (mc.find()) {
            builder.replace(mc.start() + index, mc.end() + index, "_" + mc.group().toLowerCase());
            index++;
        }
        return "`" + builder.toString() + "`";
    }
}
