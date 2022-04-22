package com.work.workhub.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.work.workhub.config.BaseResult;
import com.work.workhub.entity.*;
import com.work.workhub.repository.*;
import com.work.workhub.util.DateUtil;
import com.work.workhub.util.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.criteria.Predicate;
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author mz
 * @date 2022/4/6
 * @description
 */
@Service
@Transactional
public class OrderService {


    @Autowired
    OrderRepository orderRepository;

    @Autowired
    TimeARepository timeARepository;

    @Autowired
    TimeFRepository timeFRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ActivitiesRepository activitiesRepository;

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    VenueRepository venueRepository;

    @Autowired
    FacilitiesRepository facilitiesRepository;

    public BaseResult find(JSONObject jsonObject) {
        Orders orders = JSONObject.toJavaObject(jsonObject, Orders.class);
        Integer pageNo = jsonObject.getInteger("pageNo");
        Integer pageSize = jsonObject.getInteger("pageSize");
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Specification<Orders> querySpecifi = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (null != orders.getName() && !"".equals(orders.getName())) {
                predicates.add(cb.like((root.get("name")), "%" + orders.getName() + "%"));
            }
            if (null != orders.getCode() && !"".equals(orders.getCode())) {
                predicates.add(cb.like((root.get("code")), "%" + orders.getCode() + "%"));
            }
            if (null != orders.getVenueName() && !"".equals(orders.getVenueName())) {
                predicates.add(cb.like((root.get("venueName")), "%" + orders.getVenueName() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Page<Orders> orders1 = orderRepository.findAll(querySpecifi, pageable);
        return BaseResult.success(orders1);
    }

    public BaseResult pay(JSONObject jsonObject) {
        Integer type = jsonObject.getInteger("type");

        if (type < 1 || type > 2) {
            return BaseResult.error("-1", "type is err");
        }
        Double money = jsonObject.getDouble("money");
        String userId = jsonObject.getString("userId");
        String bank = jsonObject.getString("bank");
        Integer flag = jsonObject.getInteger("flag");

        if (null != bank && !"".equals(bank)) {
            userRepository.bank(userId, bank);
        }
        User user = userRepository.getById(userId);
        JSONArray data = jsonObject.getJSONArray("data");
        int size = data.size();
        if (size > 0) {
            money = money / size;
        }
        for (int i = 0; i < size; i++) {
            JSONObject json = data.getJSONObject(i);
            String id = json.getString("id");

            if (type == 1) {
                Integer pay = timeARepository.pay(id);
                TimeA timeA = timeARepository.getById(id);
                Orders order = getOrders(id, timeA, user, timeA.getDuringTime(), money);
                if (pay > 0 && timeA.getRemainNum() >= 0) {
                    order.setFlag(flag);
                } else {
                    order.setFlag(-1);
                }
                orderRepository.save(order);
//                Integer morning = json.getInteger("morning");
//                if (morning == 1) {
//                    Integer pay = timeARepository.payMorning(id);
//
//                    TimeA timeA = timeARepository.getById(id);
//                    Orders order = getOrders(id, timeA, user, " morning", money);
//
//                    if (pay > 0 && timeA.getMorningNums() >= 0) {
//                        order.setFlag(flag);
//                    } else {
//                        order.setFlag(-1);
//                    }
//                    orderRepository.save(order);
//                }
//                Integer afternoon = json.getInteger("afternoon");
//                if (afternoon == 1) {
//                    Integer pay = timeARepository.payAfternoon(id);
//
//                    TimeA timeA = timeARepository.getById(id);
//                    Orders order = getOrders(id, timeA, user, " afternoon", money);
//
//                    if (pay > 0 && timeA.getAfternoonNums() >= 0) {
//                        order.setFlag(flag);
//                    } else {
//                        order.setFlag(-1);
//                    }
//                    orderRepository.save(order);
//                }
//                Integer night = json.getInteger("night");
//                if (night == 1) {
//                    Integer pay = timeARepository.payNight(id);
//
//                    TimeA timeA = timeARepository.getById(id);
//                    Orders order = getOrders(id, timeA, user, " night", money);
//
//                    if (pay > 0 && timeA.getNightNums() >= 0) {
//                        order.setFlag(flag);
//                    } else {
//                        order.setFlag(-1);
//                    }
//                    orderRepository.save(order);
//            }

            } else if (type == 2) {
                Integer pay = timeFRepository.pay(id);
                TimeF timeF = timeFRepository.getById(id);
                Facilities facilities = facilitiesRepository.getById(timeF.getPId());
                Orders order = new Orders();
                String code = UUIDUtil.uuid();
                order.setId(code);
                order.setCode(code);
                order.setUserId(user.getId());
                order.setUserName(user.getUserName());
                order.setTime(timeF.getTime());
                order.setTimeType("");
                order.setUrl(facilities.getUrl());
                order.setPrice(money);
                order.setVenueId(facilities.getVenueId());
                order.setVenueName(facilities.getVenueName());
                order.setPid(facilities.getId());
                order.setName(facilities.getName());
                if (pay > 0 && timeF.getNums() >= 0) {
                    order.setFlag(flag);
                } else {
                    order.setFlag(-1);
                }
                orderRepository.save(order);
            }
        }

        return BaseResult.success("Appointment succeeded");
    }

    private Orders getOrders(String id, TimeA timeA, User user, String duringTime, Double money) {
        Activities activities = activitiesRepository.getById(timeA.getPId());

        Orders order = new Orders();
        String code = UUIDUtil.uuid();
        order.setId(code);
        order.setCode(code);
        order.setUserId(user.getId());
        order.setUserName(user.getUserName());
        order.setTime(timeA.getTime());
        order.setDuringTime(duringTime);
        order.setPrice(money);
        order.setUrl(activities.getUrl());
        order.setVenueId(activities.getVenueId());
        order.setVenueName(activities.getVenueName());
        order.setPid(activities.getId());
        order.setName(activities.getName());
        return order;
    }

    public BaseResult getOrdersByUser(String userId) {
        System.out.println(userId);
//        userId="42d6003666504463bb3aef71633cc36f";
        return BaseResult.success(orderRepository.getByUserId(userId));
    }

    public BaseResult refund(String id) {
        Orders orders = orderRepository.getById(id);
        if (null == orders) {
            return BaseResult.error("-1", "order is not exist");
        }
        if (orders.getFlag() != 0 && orders.getFlag() != 3) {
            orders.setFlag(3);
            orderRepository.save(orders);
            if (orders.getTimeType().equals("")) {
                timeFRepository.refund(orders.getTime() + orders.getPid());
            } else {
                if (orders.getTimeType().contains("morning")) {
                    timeARepository.refundMorning(orders.getTime() + orders.getPid());
                } else if (orders.getTimeType().contains("fternoon")) {
                    timeARepository.refundAfternoon(orders.getTime() + orders.getPid());
                } else if (orders.getTimeType().contains("night")) {
                    timeARepository.refundNight(orders.getTime() + orders.getPid());
                }
            }
            return BaseResult.success("Refund successful");
        } else {
            return BaseResult.error("-1", "Non refundable");
        }
    }

    public BaseResult statistics(String startDate, String endDate) {
        JSONObject result = new JSONObject();
        JSONObject pie = new JSONObject();
        pie.put("pay", orderRepository.statisticsPay(startDate, endDate));
        pie.put("count", orderRepository.statisticsCount(startDate, endDate));
        JSONObject line = new JSONObject();
        String start = DateUtil.getDateBeforeStr(new Date(), 7);
        String end = DateUtil.getDateBeforeStr(new Date(), 1);
        JSONArray payList=new JSONArray();
        JSONArray countList=new JSONArray();
        while (end.compareTo(start)>=0){
            JSONObject pay=new JSONObject();
            JSONObject count=new JSONObject();
            pay.put("time",start);
            count.put("time",start);
            pay.put("total",null==orderRepository.timePay(start)?0:orderRepository.timePay(start));
            count.put("total",null==orderRepository.timeCount(start)?0:orderRepository.timeCount(start));
            payList.add(pay);
            countList.add(count);
            start= DateUtil.getDateBeforeStr(start,-1);
        }

        line.put("pay", payList);
        line.put("count", countList);
        result.put("count",orderRepository.total(startDate,endDate));
        result.put("pay",orderRepository.payAll(startDate,endDate));
        result.put("venueTotal",venueRepository.total());
        result.put("user",userRepository.total());
        result.put("line",line);
        result.put("pie",pie);
        return BaseResult.success(result);
    }

    public BaseResult sendOrder(JSONObject jsonObject) {
        try {
            String userId = jsonObject.getString("userId");
            User user = userRepository.getById(userId);
            if (null == user.getMail() || !user.getMail().contains("163.com")) {
                return BaseResult.error("-1", "No email address");
            }
            String orderId = jsonObject.getString("orderId");
            Orders order = orderRepository.getById(orderId);
            StringBuilder text = new StringBuilder("receipt number :  ");
            text.append(order.getCode())
                    .append("    \n")
                    .append("order time :   ")
                    .append(order.getTime())
                    .append(" ").append(order.getTimeType())
                    .append("    \n")
                    .append("name :   ")
                    .append(order.getName())
                    .append("    \n")
                    .append("total :   ")
                    .append(order.getPrice())
                    .append("    \n");
            sendSimpleMail(user.getMail(), text.toString());
            return BaseResult.success("Sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResult.error("-1", "fail in send");
        }
    }


    public void sendSimpleMail(String mail, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("workhub order");
        message.setFrom("workhub_leeds@163.com");
        message.setTo(mail);
        message.setSentDate(new Date());
        message.setText(text);
        javaMailSender.send(message);
    }

    public void sendImgResMail() throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setSubject("workhub order");
        helper.setFrom("workhub_leeds@163.com");
        helper.setTo("mz_mazhuang@163.com");
        helper.setSentDate(new Date());
        helper.setText("<p>hello 大家好，这是一封测试邮件，这封邮件包含两种图片，分别如下</p><p>第一张图片：</p><img src='cid:p01'/><p>第二张图片：</p><img src='cid:p02'/>", true);
        helper.addInline("p01", new FileSystemResource(new File("C:\\Users\\mazhuang\\Desktop/123456.jpg")));
        helper.addInline("p02", new FileSystemResource(new File("C:\\Users\\mazhuang\\Desktop/123456.jpg")));
        javaMailSender.send(mimeMessage);
    }

    public BaseResult change(JSONObject jsonObject) {
        String id = jsonObject.getString("id");
        Integer flag = jsonObject.getInteger("flag");
        if(flag==3){
           return refund(id);
        }
        Orders orders = orderRepository.getById(id);
        orders.setFlag(flag);
        orderRepository.save(orders);
        return BaseResult.success("Sent successfully");
    }
}