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


    @Autowired
    private AuthenticationService authenticationService;

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    //@Autowired
    public UserController(UserService userService, UserRepository userRepository, TaskRepository taskRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }



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

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

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

    // Example: http://localhost:8080/api/users/2/tasks this one creates a task for the user with the id 2.
    // Get all tasks for a specific user
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




    @PostMapping("/")
    public ResponseEntity<User> registerUser(@Valid @RequestBody User user) {
        User createdUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }


    // Create a new task for a specific user
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



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    /*
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        System.out.println("does bob bob");
        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/

    // This GetMapping gets the UserId of a user.
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
