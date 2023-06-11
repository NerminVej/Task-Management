package com.example.backend.repositories;

import com.example.backend.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);


    void delete(Long id);

    @Modifying
    @Query("DELETE FROM Task t WHERE t.id = :taskId")
    void deleteById(@Param("taskId") Long taskId);
}
