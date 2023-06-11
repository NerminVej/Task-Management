package com.example.backend;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.TaskService;
import com.example.backend.services.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;


@RunWith(MockitoJUnitRunner.class)
public class YourServiceTest {


    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TaskService taskService;

    @InjectMocks
    private UserService userService;

    @Before
    public void setUp() {
        // Set up any necessary initialization or configuration
    }

    @Test
    void testGetAllUsers() {
        // Mock the repository response
        List<User> users = new ArrayList<>();
        users.add(new User(1L, "John"));
        users.add(new User(2L, "Jane"));
        when(userRepository.findAll()).thenReturn(users);

        // Call the service method
        List<User> result = userService.getAllUsers();

        // Check the result
        assertEquals(users, result);
    }

    @Test
    void testGetUserById() {
        // Mock the repository response
        User user = new User(1L, "John");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Call the service method
        Optional<User> result = userService.getUserById(1L);

        // Check the result
        assertEquals(Optional.of(user), result);
    }

    @Test
    void testRegisterUser() {
        // Create a new user
        User user = new User(1L, "John");

        // Mock the repository response
        when(userRepository.save(user)).thenReturn(user);

        // Call the service method
        User result = userService.registerUser(user);

        // Check the result
        assertEquals(user, result);
    }


    @Test
    void testDeleteUser() {
        // Create a user with ID 1
        User user = new User();
        user.setId(1L);

        // Stub the repository's findById method to return the user
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Call the service method
        userService.deleteUser(1L);

        // Verify that the repository's delete method is called with ID 1
        verify(userRepository, times(1)).deleteById(1L);

        // Verify that the repository's findById method is not called
        verify(userRepository, never()).findById(anyLong());
    }





    @Test
    void testAuthenticateUser() {
        // Mock the repository response
        User user = new User(1L, "John");
        when(userRepository.findByUsernameAndPassword("john", "password")).thenReturn(Optional.of(user));

        // Call the service method
        Optional<User> result = userService.authenticateUser("john", "password");

        // Check the result
        assertEquals(Optional.of(user), result);
    }
}



