package com.example.backend.controllers;

import com.example.backend.models.Task;
import com.example.backend.models.User;
import com.example.backend.repositories.TaskRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.AuthenticationService;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    @Autowired
    private AuthenticationService authenticationService;

    public UserController(UserService userService, UserRepository userRepository, TaskRepository taskRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    // This method handles the HTTP POST request for user login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("email") String email,
                                        @RequestParam("password") String password) {
        try {
            boolean isAuthenticated = authenticationService.authenticate(email, password);

            if (isAuthenticated) {
                // Authentication successful
                // Generate token or perform any other actions
                return ResponseEntity.ok("Authentication successful");
            } else {
                // Authentication failed
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (IllegalArgumentException e) {
            // Invalid input, such as null or empty email/password
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Other exceptions occurred during authentication
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    // This method handles the HTTP GET request to retrieve all users
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // This method handles the HTTP GET request to retrieve a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // This method handles the HTTP GET request to retrieve all tasks for a specific user
    @GetMapping("/{userId}/tasks")
    public ResponseEntity<List<Task>> getUserTasks(@PathVariable Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Task> tasks = user.getTasks();
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // This method handles the HTTP POST request to register a new user
    @PostMapping("/")
    public ResponseEntity<User> registerUser(@Valid @RequestBody User user) {
        User createdUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // This method handles the HTTP POST request to create a new task for a specific user
    @PostMapping("/{userId}/tasks")
    public ResponseEntity<Task> createTask(@PathVariable Long userId, @RequestBody Task task) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            task.setUserId(userId); // Set the userId directly in the task

            Task savedTask = taskRepository.save(task);
            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // This method handles the HTTP DELETE request to delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    // This method handles the HTTP GET request to retrieve the user ID by email
    @GetMapping("/email/{email:.+}")
    public ResponseEntity<Long> getUserIdByEmail(@PathVariable("email") String email) {
        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return ResponseEntity.ok(user.getId());
        } else {
            return ResponseEntity.notFound().build();
        }
    }





}
