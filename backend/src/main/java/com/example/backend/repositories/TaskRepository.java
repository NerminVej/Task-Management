package com.example.backend.repositories;

import com.example.backend.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    //List<Task> findByUserId(Long id);

    //@Query("SELECT t FROM Task t JOIN FETCH t.user u WHERE u.id = :userId")
    //List<Task> findByUserId(@Param("userId") Long userId);


    //@Query("SELECT t FROM Task t WHERE t.id = :id")
    //List<Task> findByUserId(@Param("id") Long id);

    //void delete(Long id);


    //void deleteById(Long taskId);
}
