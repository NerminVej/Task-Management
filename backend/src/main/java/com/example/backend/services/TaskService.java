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

    /**
     * Retrieves all tasks from the repository.
     *
     * @return the list of tasks
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Retrieves a task by its ID from the repository.
     *
     * @param id the ID of the task
     * @return the optional task
     */
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    /**
     * Creates a new task in the repository.
     *
     * @param task the task to create
     * @return the created task
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Updates an existing task in the repository.
     *
     * @param id   the ID of the task to update
     * @param task the updated task
     * @return the updated task
     */
    public Task updateTask(Long id, Task task) {
        return taskRepository.save(task);
    }

    /**
     * Deletes a task by its ID from the repository.
     *
     * @param taskId the ID of the task to delete
     */
    public void deleteTaskById(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            taskRepository.delete(task);
        } else {
            throw new IllegalArgumentException("Task not found with ID: " + taskId);
        }
    }

    /**
     * Retrieves all tasks associated with a specific user ID from the repository.
     *
     * @param userId the ID of the user
     * @return the list of tasks associated with the user
     */
    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    /**
     * Deletes a task from the repository.
     *
     * @param task the task to delete
     */
    public void deleteTask(Task task) {
        taskRepository.delete(task);
    }

    /**
     * Saves a task in the repository.
     *
     * @param task the task to save
     * @return the saved task
     */
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }
}
