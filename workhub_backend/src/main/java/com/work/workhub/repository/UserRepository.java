package com.work.workhub.repository;

import com.work.workhub.entity.User;
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
public interface UserRepository extends JpaRepository<User,String> , JpaSpecificationExecutor<User> {

    @Query(value="select * from user where user_name=?1",nativeQuery = true)
    User getByUserName(String userName);

    @Query(value="select * from user where id=?1 ",nativeQuery = true)
    User getById(String id);

    @Query(value="select * from user where user_name=?1 and password=?2",nativeQuery = true)
    User login(String userName,String password);

    @Query(value="select count(*) from user",nativeQuery = true)
    Integer total();

    @Modifying
    @Query(value="delete from user where id in (?1)",nativeQuery = true)
    Integer del(List<String> id);

    @Modifying
    @Query(value="update user set password=?2 where id =?1",nativeQuery = true)
    Integer changePassword(String id,String password);

    @Modifying
    @Query(value="update user set vip=?2 where id =?1",nativeQuery = true)
    Integer vip(String id, Integer vip);

    @Modifying
    @Query(value="update user set bank=?2 where id =?1",nativeQuery = true)
    Integer bank(String id, String bank);
}
