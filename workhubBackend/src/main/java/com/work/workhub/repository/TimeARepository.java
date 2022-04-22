package com.work.workhub.repository;

import com.work.workhub.entity.TimeA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author md
 * @date 2022/4/5
 * @description
 */
@Repository
public interface TimeARepository extends JpaRepository<TimeA,String> , JpaSpecificationExecutor<TimeA> {

    @Query(value = "select * from timea where p_id=?1", nativeQuery = true)
    List<TimeA> getByPid(String pid);

    @Query(value = "select * from timea where p_id=?1 and time>=?2 and time<=?3 order by time asc", nativeQuery = true)
    List<TimeA> getByPid(String pid,String startDate, String endDate);

    @Query(value = "select * from timea where id=?1", nativeQuery = true)
    TimeA getById(String id);

    @Modifying
    @Query(value="delete from timea where p_id=?1 and (time<?2 or time>?3) ",nativeQuery = true)
    Integer del(String pid,String startDate, String endDate);

    @Modifying
    @Query(value="delete from timea where p_id in (?1) ",nativeQuery = true)
    Integer del(List<String> pid);


    @Modifying
    @Query(value="update timea set morning_nums=morning_nums-1 where id=?1 and morning_nums>0",nativeQuery = true)
    Integer payMorning(String id);

    @Modifying
    @Query(value="update timea set afternoon_nums=afternoon_nums-1 where id=?1  and afternoon_nums>0",nativeQuery = true)
    Integer payAfternoon(String id);

    @Modifying
    @Query(value="update timea set night_nums=night_nums-1 where id=?1  and night_nums>0",nativeQuery = true)
    Integer payNight(String id);


    @Modifying
    @Query(value="update timea set morning_nums=morning_nums+1 where id=?1 and morning_nums>=0",nativeQuery = true)
    Integer refundMorning(String id);

    @Modifying
    @Query(value="update timea set afternoon_nums=afternoon_nums+1 where id=?1  and afternoon_nums>=0",nativeQuery = true)
    Integer refundAfternoon(String id);

    @Modifying
    @Query(value="update timea set night_nums=night_nums+1 where id=?1  and night_nums>=0",nativeQuery = true)
    Integer refundNight(String id);

}
