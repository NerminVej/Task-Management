package com.example.backend.controllers;

import com.example.backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<String> login(@RequestParam("email") String email,
                                        @RequestParam("password") String password) {
        try {
            boolean isAuthenticated = authenticationService.authenticate(email, password);

            if (isAuthenticated) {
                // Authentication successful
                UserDetails userDetails = new UserDetails(email);
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
