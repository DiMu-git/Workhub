package com.work.workhub.repository;

import com.work.workhub.entity.Facilities;
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
public interface FacilitiesRepository extends JpaRepository<Facilities,String> , JpaSpecificationExecutor<Facilities> {

    @Query(value="select * from facilities where venue_id=?1 and ((start_date<=?2 and end_Date>=?2) or (start_date<=?3 and end_date>=?3) or (start_date>=?2 and end_date<=?3)) order by create_time asc",nativeQuery=true)
    List<Facilities> getByVenueId(String venueId, String startDate, String endDate);

    @Query(value="select * from facilities where ((start_date<=?1 and end_Date>=?1) or (start_date<=?2 and end_date>=?2) or (start_date>=?1 and end_date<=?2))",nativeQuery=true)
    List<Facilities> getByDate(String startDate, String endDate);

    @Query(value = "select * from facilities where name=?1 and venue_name=?2", nativeQuery = true)
    Facilities getByName(String s, String venueName);


    @Query(value = "select * from facilities where id=?1 ", nativeQuery = true)
    Facilities getById(String id);


    @Modifying
    @Query(value="delete from facilities where id in (?1)",nativeQuery = true)
    Integer del(List<String> id);
}
