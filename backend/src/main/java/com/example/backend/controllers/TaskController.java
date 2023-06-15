package com.example.backend.controllers;

import com.example.backend.models.Task;
import com.example.backend.models.User;
import com.example.backend.services.TaskService;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {


    private final TaskService taskService;


    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    // With this we are able to get all the tasks
    @GetMapping("/")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // http://localhost:8080/api/tasks/user/1 as an example. Gets me all the tasks for the user with the id 1.
    // The endpoint that lets us get all the tasks of one specific user.
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getTasksByUserId(@PathVariable Long userId) {
        List<Task> tasks = taskService.getTasksByUserId(userId);
        return ResponseEntity.ok(tasks);
    }



    @PostMapping("/")
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task, @RequestParam("user_id") Long userId) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);


    }







    // http://localhost:8080/api/tasks/user/1/4 This updates the task with the id of 4 of the user with the id 1.
    @PutMapping("/user/{userId}/{taskId}")
    public ResponseEntity<Task> updateTaskForUser(@PathVariable Long userId, @PathVariable Long taskId, @RequestBody Task updatedTask) {

        Optional<User> optionalUser = userService.getUserById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // the problem is this line. It results into us getting an empty list.
            List<Task> tasks = taskService.getTasksByUserId(userId);

            Optional<Task> optionalTask = tasks.stream().filter(task -> {
                System.out.println("Task ID: " + task.getId());
                System.out.println("Target Task ID: " + taskId);
                return task.getId().equals(taskId);
            }).findFirst();


            if (optionalTask.isPresent()) {
                Task task = optionalTask.get();
                // Update the task properties
                task.setName(updatedTask.getName());
                task.setStatus(updatedTask.getStatus());
                task.setComment(updatedTask.getComment());
                task.setTime(updatedTask.getTime());
                // Save the updated task
                Task savedTask = taskService.saveTask(task);
                return ResponseEntity.ok(savedTask);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // http://localhost:8080/api/tasks/user/1/7 This deletes the task with the id of 7 inside the user with the id of 1.
    @DeleteMapping("/user/{userId}/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        Optional<Task> optionalTask = taskService.getTaskById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            taskService.deleteTask(task);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }





}
