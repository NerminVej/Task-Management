package com.mygroup.TaskManagement.repositories;

import com.mygroup.TaskManagement.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    //Optional<Task> findById(Long taskId);

    //List<Task> findAll();

    Task save(Task task);

    void delete(Task task);

    // Modifying performs a modification.
    @Modifying
    // Query specifies the custom update query.
    @Query("UPDATE Task t SET t.status = :status WHERE t.id = :id")
    // Param are the parameters that we want to get.
    void updateTaskStatus(@Param("id") Long id, @Param("status") String status);

}
