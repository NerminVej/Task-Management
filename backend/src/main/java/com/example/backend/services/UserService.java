package com.example.backend.services;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves all users from the repository.
     *
     * @return the list of users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by their ID from the repository.
     *
     * @param id the ID of the user
     * @return the optional user
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Registers a new user in the repository.
     *
     * @param user the user to register
     * @return the registered user
     */
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Deletes a user by their ID from the repository.
     *
     * @param userId the ID of the user to delete
     */
    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    /**
     * Authenticates a user with the provided username and password.
     *
     * @param username the username of the user
     * @param password the password of the user
     * @return the optional authenticated user
     */
    public Optional<User> authenticateUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    /**
     * Finds a user by their email, ignoring case sensitivity.
     *
     * @param email the email of the user
     * @return the optional user with the specified email
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }
}
