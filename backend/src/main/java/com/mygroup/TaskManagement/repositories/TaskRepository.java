package com.mygroup.TaskManagement.repositories;

import com.mygroup.TaskManagement.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    //Optional<Task> findById(Long taskId);

    //List<Task> findAll();

    Task save(Task task);

    void delete(Task task);
}
