package com.example.backend.services;


import com.example.backend.models.Task;
import com.example.backend.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task task) {
        return taskRepository.save(task);
    }

    /*public void deleteTask(Long id) {
        taskRepository.delete(id);
    }*/

    public void deleteTaskById(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            taskRepository.delete(task);
        } else {
            throw new IllegalArgumentException("Task not found with ID: " + taskId);
        }
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUser_Id(userId);
    }

}
