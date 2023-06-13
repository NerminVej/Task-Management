package com.example.backend.services;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
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

    private final String SECRET_KEY;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthenticationService() {
        // Generates a secure random secret key
        byte[] keyBytes = new byte[64];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(keyBytes);
        SECRET_KEY = Base64.getEncoder().encodeToString(keyBytes);
    }





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
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        // Retrieve the user from the database based on the email
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Compare the provided password with the stored password (hashed)
            if (passwordEncoder.matches(password, user.getPassword())) {
                return true; // Authentication successful
            }
        }

        return false; // Authentication failed
    }


}
