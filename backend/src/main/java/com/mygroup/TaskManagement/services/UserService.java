package com.mygroup.TaskManagement.services;

import com.mygroup.TaskManagement.models.User;
import com.mygroup.TaskManagement.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

public class UserService {

    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public User registerUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }

    
}
