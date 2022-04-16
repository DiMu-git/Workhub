package com.work.workhub.repository;

import com.work.workhub.entity.TimeF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author mz
 * @date 2022/4/5
 * @description
 */
@Repository
public interface TimeFRepository extends JpaRepository<TimeF, String>, JpaSpecificationExecutor<TimeF> {


    @Query(value = "select * from timef where p_id=?1", nativeQuery = true)
    List<TimeF> getByPid(String pid);

    @Query(value = "select * from timef where p_id=?1 and time>=?2 and time<=?3 order by time asc", nativeQuery = true)
    List<TimeF> getByPid(String pid, String startDate, String endDate);

    @Query(value = "select * from timef where id=?1", nativeQuery = true)
    TimeF getById(String id);


    @Modifying
    @Query(value="delete from timef where p_id=?1 and (time<?2 or time>?3) ",nativeQuery = true)
    Integer del(String pid,String startDate, String endDate);

    @Modifying
    @Query(value="update timef set nums=nums-1 where id=?1 and nums>0",nativeQuery = true)
    Integer pay(String id);
    @Modifying
    @Query(value="update timef set nums=nums+1 where id=?1 and nums>=0",nativeQuery = true)
    Integer refund(String id);

    @Modifying
    @Query(value="delete from timef where p_id in (?1) ",nativeQuery = true)
    Integer del(List<String> pid);

}
