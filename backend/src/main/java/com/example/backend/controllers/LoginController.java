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

    // This method retrieves a user from the UserRepository based on the provided email.
    public User getUserByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    // This method handles the HTTP POST request to the "/" endpoint for user login.
    @PostMapping("/")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        try {
            // Authenticate the user using the AuthenticationService.
            boolean isAuthenticated = authenticationService.authenticate(email, password);

            if (isAuthenticated) {
                // Authentication successful
                // Retrieve the user from the UserRepository using the provided email.
                User user = getUserByEmail(email);
                // Create UserDetails object from the retrieved user.
                UserDetails userDetails = new CustomUserDetails(user);
                // Generate a token using the AuthenticationService.
                String token = authenticationService.generateToken(userDetails);
                return ResponseEntity.ok(token); // Return the token in the response body.
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
