package com.mygroup.TaskManagement.services;

import com.mygroup.TaskManagement.models.Task;
import com.mygroup.TaskManagement.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class TaskService {

    // Automatically injects an instance of the "TaskRepository" into the "TaskService" class.
    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long id, String status){
        taskRepository.updateTaskStatus(id, status);
        Optional<Task> taskOptional = taskRepository.findById(id);
        // If the task has been found then it will get returned otherwise "null" will get returned.
        return taskOptional.orElse(null);
    }

    public Optional<Task> getTaskById(Long id){
        return taskRepository.findById(id);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }


}
