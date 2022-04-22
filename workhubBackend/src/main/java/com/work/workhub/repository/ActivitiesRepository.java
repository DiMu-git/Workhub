package com.work.workhub.repository;

import com.work.workhub.entity.Activities;
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
public interface ActivitiesRepository extends JpaRepository<Activities,String> , JpaSpecificationExecutor<Activities> {

    @Query(value="select * from activities where venue_id=?1 and ((start_date<=?2 and end_Date>=?2) or (start_date<=?3 and end_date>=?3) or (start_date>=?2 and end_date<=?3))  order by create_time asc",nativeQuery=true)
    List<Activities> getByVenueId(String venueId,String startDate,String endDate);

    @Query(value="select * from activities where ((start_date<=?1 and end_Date>=?1) or (start_date<=?2 and end_date>=?2) or (start_date>=?1 and end_date<=?2))",nativeQuery=true)
    List<Activities> getByDate(String startDate, String endDate);

    @Query(value = "select * from activities where name=?1 and venue_name=?2", nativeQuery = true)
    Activities getByName(String s, String venueName);

    @Query(value = "select * from activities where id=?1 ", nativeQuery = true)
    Activities getById(String id);


    @Modifying
    @Query(value="delete from activities where id in (?1)",nativeQuery = true)
    Integer del(List<String> id);

}
