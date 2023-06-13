package com.example.backend.services;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    // Example method to authenticate user credentials
    public boolean authenticate(String email, String password) {
        // Retrieve the user from the database based on the email
        User user = userRepository.findByEmail(email);

        if (user != null) {
            // Compare the provided password with the stored password (hashed)
            return BCrypt.checkpw(password, user.getPassword());
        }

        return false;
    }

    // Example method to generate an authentication token
    public String generateAuthToken(String email) {
        // Generate a JWT token with the user's email as the subject
        String token = Jwts.builder()
                .setSubject(email)
                .signWith(SignatureAlgorithm.HS256, "yourSecretKey")
                .compact();

        return token;
    }
}
