package com.example.backend.controllers;

import com.example.backend.models.LoginRequest;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.AuthenticationService;
import com.example.backend.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private AuthenticationService authenticationService;

    public LoginController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Autowired
    private UserRepository userRepository;


    public User getUserByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
    @PostMapping("/")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Does this get triggered");
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        try {
            boolean isAuthenticated = authenticationService.authenticate(email, password);

            System.out.println(authenticationService.authenticate(email, password));
            if (isAuthenticated) {
                // Authentication successful
                User user = getUserByEmail(email);
                UserDetails userDetails = new CustomUserDetails(user);
                String token = authenticationService.generateToken(userDetails);
                return ResponseEntity.ok(token);
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


}
