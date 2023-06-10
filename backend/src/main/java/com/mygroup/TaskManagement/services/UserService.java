package com.mygroup.TaskManagement.services;

import com.mygroup.TaskManagement.models.User;
import com.mygroup.TaskManagement.repositories.UserRepository;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import com.mygroup.TaskManagement.exceptions.AuthenticationException;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    public User registerUser(@Valid @NotNull User user) {
        // Perform validation on user input
        // Example: Check if username is unique, password meets complexity requirements, etc.
        // If validation fails, throw appropriate exception or handle the error scenario
        // ...

        return userRepository.save(user);
    }



    public void deleteUser(User user){
        userRepository.delete(user);
    }

    public Optional<User> authenticateUser(String username, String password){
        Optional<User> optionalUser = userRepository.findByUsernameAndPassword(username, password);

        if (optionalUser.isEmpty()){
            throw new AuthenticationException("Invalid username or password");

        }
        return optionalUser;
    }



}
