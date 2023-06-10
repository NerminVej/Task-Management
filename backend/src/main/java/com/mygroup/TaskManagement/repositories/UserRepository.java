package com.mygroup.TaskManagement.repositories;

import com.mygroup.TaskManagement.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User save (User user);
    void delete (User user);



}
