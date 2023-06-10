package com.mygroup.TaskManagement.repositories;

import com.mygroup.TaskManagement.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);



}