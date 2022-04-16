package com.work.workhub.repository;

import com.work.workhub.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author mz
 * @date 2022/4/5
 * @description
 */
@Repository
public interface OrderRepository extends JpaRepository<Orders,String> , JpaSpecificationExecutor<Orders> {

    @Query(value="select * from orders where user_id=?1",nativeQuery=true)
    List<Orders> getByUserId(String userId);

    @Query(value="select * from orders where id=?1",nativeQuery=true)
    Orders getById(String id);

    @Query(value="SELECT venue_name \"venueName\",COUNT(venue_name)  \"total\"\n" +
            "FROM orders\n" +
            "where time >=?1 and time <=?2\n" +
            "GROUP BY venue_id,venue_name",nativeQuery=true)
    List<Map<String ,Object>> statisticsCount(String startDate,String endDate);

    @Query(value="SELECT venue_name \"venueName\",ROUND(sum(price),2)  \"total\"\n" +
            "FROM orders\n" +
            "where time >=?1 and time <=?2\n" +
            "GROUP BY venue_id,venue_name",nativeQuery=true)
    List<Map<String ,Object>> statisticsPay(String startDate,String endDate);
}
