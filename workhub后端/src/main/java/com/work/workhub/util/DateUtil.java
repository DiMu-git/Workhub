package com.work.workhub.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

/**
 * @author md
 * @date 2022/4/8
 * @description
 */
public class DateUtil {

    public static final String ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";

    public static final String ISO_0_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

    public static final String CHINA_TIME_ZONE = "Asia/Shanghai";

    /**
     * yyyy-MM-dd HH:mm:ss
     */
    public static final String DATE_TIME_FORMAT_24 = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_TIME_FORMAT_24_NORMAL = "yyyyMMddHHmmss";
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String MONTH_FORMAT = "yyyy-MM";

    /**
     * 获取当前时区的ISO时间字符串
     */
    public static String getDefaultISOTimeStr(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT);
        sdf.setTimeZone(TimeZone.getDefault());
        return sdf.format(date);
    }

    /**
     * 将date转成iso字符串
     */
    public static String dateToISO(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT);
        return sdf.format(date);
    }

    public static String date2ISO(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat(ISO_0_FORMAT);
        return sdf.format(date);
    }
    public static String date2Str(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
        return sdf.format(date);
    }
    public static Date str2Date(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
        return sdf.parse(date);
    }

    /**
     * 日期转换为时间戳
     */
    public static String dateToStamp(Date date) {
        return String.valueOf(date.getTime());
    }

    public static Date ISO2Date (String ISOTimeString)throws Exception{
        DateFormat format = new SimpleDateFormat(ISO_FORMAT);
        return format.parse(ISOTimeString);
    }


    /**
     * 将iso字符串转成date
     */
    public static Date isoToDate(String time) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT);
        return sdf.parse(time);
    }

    public static void main(String[] args) throws ParseException {
        //System.out.println(getChinaTimeZoneUTCStr2("2018-06-20T08:39:10Z"));
        /*System.out.println(getDateBeforeFormat(new Date(), 0));*/
        try {
            System.out.println(date2ISO(ISO2Date("2018-12-20T16:58:25.559+08:00")));
        } catch (Exception e) {/**/
            e.printStackTrace();
        }
        getRecent3MonthDate();
    }

    /**
     * 将ISO时间转成yyyy-MM-dd HH:mm:ss格式
     */
    public static String formatToDateTimeFormat24(String isoDatetime) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT);
        SimpleDateFormat sdf2 = new SimpleDateFormat(DATE_TIME_FORMAT_24);
        return sdf2.format(sdf.parse(isoDatetime));
    }

    public static String getToDateTimeFormat24Normal() throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_TIME_FORMAT_24_NORMAL);
        return sdf.format(new Date());
    }

    /**
     * 获取GMT时间字符串(云存储使用)
     */
    public static String toGMTString(Date date) {
        SimpleDateFormat df = new SimpleDateFormat("dd MMM yyyy HH:mm:ss z", Locale.UK);
        df.setTimeZone(new java.util.SimpleTimeZone(0, "GMT"));
        return df.format(date);
    }

    /**
     * 获取前n天的日期
     *
     * @param d   当前日期
     * @param day 前n天
     */
    public static Date getDateBefore(Date d, int day) {
        Calendar no = Calendar.getInstance();
        no.setTime(d);
        no.set(Calendar.DATE, no.get(Calendar.DATE) - day);
        return no.getTime();
    }
    public static String getDateBeforeStr(Date d, int day) {
        Date dateBefore = getDateBefore(d, day);
        return date2Str(dateBefore);
    }
    public static String getDateBeforeStr(String d, int day) {

        Date dateBefore = null;
        try {
            dateBefore = getDateBefore(str2Date(d), day);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date2Str(dateBefore);
    }
    /**
     * 获取前n小时的日期
     *
     * @param d   当前日期
     * @param h 前n小时
     */
    public static Date getHourBefore(Date d, int h) {
        Calendar no = Calendar.getInstance();
        no.setTime(d);
        no.set(Calendar.DATE, no.get(Calendar.HOUR_OF_DAY) - h);
        return no.getTime();
    }
    public static Date getMINUTEBefore(Date d, int min) {
        Calendar no = Calendar.getInstance();
        no.setTime(d);
        no.set(Calendar.MINUTE, no.get(Calendar.MINUTE) - min);
        return no.getTime();
    }

    public static String getDateBeforeFormat(Date d, int day) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return df.format(getDateBefore(d, day));
    }

    public static String formatDate(Date dateTime, String format) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        // 设置伦敦时区
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        return simpleDateFormat.format(dateTime);
    }
    /**
     * 获取最近三个月时间,加上一天，防止三个月临界值出错
     */
    public static Date getRecent3MonthDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -3);
        calendar.add(Calendar.DATE, 1);
        return calendar.getTime();
    }

    public static Date getNextDate(Date date){
        long time = date.getTime();
        time=time+(long)10;
        Date d = new Date();
        d.setTime(time);
        return d;
    }
}
