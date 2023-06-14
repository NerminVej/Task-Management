package com.example.backend.services;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthenticationService {


    @Autowired
    private UserRepository userRepository;

    private UserService userService;

    private final String SECRET_KEY;

    private Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    public AuthenticationService() {
        // Generates a secure random secret key
        byte[] keyBytes = new byte[64];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(keyBytes);
        SECRET_KEY = Base64.getEncoder().encodeToString(keyBytes);
    }
    // Other methods in the class







    // Methods to generate an authentication token
    private Date getExpirationDate() {
        // Sets the expiration duration in milliseconds (e.g., 1 day)
        long expirationDuration = 24 * 60 * 60 * 1000; // 1 day in milliseconds

        // Calculates the expiration date by adding the duration to the current date
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MILLISECOND, (int) expirationDuration);

        return calendar.getTime();
    }

    public String generateToken(UserDetails userDetails) {
        // Generates a Key instance from the secret key
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        // Builds the JWT token
        String token = Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(getExpirationDate())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return token;
    }


    // Methods to authenticate user credentials
    public boolean authenticate(String email, String password) {
        System.out.println("authenticate executes");

        if (email == null || email.isEmpty()) {

            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        if (password == null || password.isEmpty()) {

            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        // Retrieve the user from the database based on the email

        // Here is the issue.
        Optional<User> userOptional = Optional.ofNullable(userService.getUserByEmail(email));
        System.out.println(userOptional);
        System.out.println("This does too");

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Log the user details
            System.out.println("User found: " + user.getUsername());
        } else {
            // Log that no user was found
            System.out.println("User not found for email: " + email);
        }

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Log the provided and stored passwords for debugging
            System.out.println("Provided password: " + password);
            System.out.println("Stored password: " + user.getPassword());

            // Compare the provided password with the stored password (plaintext)
            if (password.equals(user.getPassword())) {
                System.out.println("Authentication successful");
                return true; // Authentication successful
            }
        }

        System.out.println("Authentication failed");
        return false; // Authentication failed
    }




}
