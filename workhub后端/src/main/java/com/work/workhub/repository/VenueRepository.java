package com.work.workhub.repository;

import com.work.workhub.entity.Venue;
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
public interface VenueRepository extends JpaRepository<Venue, String>, JpaSpecificationExecutor<Venue> {


    @Query(value = "select * from venue where name=?1", nativeQuery = true)
    Venue getByName(String name);


    @Query(value = "select * from venue where id=?1 ", nativeQuery = true)
    Venue getById(String id);


    @Modifying
    @Query(value="delete from venue where id in (?1)",nativeQuery = true)
    Integer del(List<String> id);
}
