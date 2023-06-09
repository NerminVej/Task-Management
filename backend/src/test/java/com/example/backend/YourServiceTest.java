package com.example.backend;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.TaskService;
import com.example.backend.services.UserService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;


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
    }

    @Test
    public void testGetAllUsers() {
        // Mocks the repository response
        List<User> users = new ArrayList<>();
        users.add(new User(1L, "John"));
        users.add(new User(2L, "Jane"));
        when(userRepository.findAll()).thenReturn(users);

        // Calls the service method
        List<User> result = userService.getAllUsers();

        // Checks the result
        assertEquals(users, result);
    }

    @Test
    public void testGetUserById() {
        // Mocks the repository response
        User user = new User(1L, "John");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Calls the service method
        Optional<User> result = userService.getUserById(1L);

        // Checks the result
        assertEquals(Optional.of(user), result);
    }

    @Test
    public void testRegisterUser() {
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
    public void testDeleteUser() {
        // Create a user with ID 1
        User user = new User();
        user.setId(1L);

        // Stub the repository's findById method to return the user
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Call the service method
        userService.deleteUserById(1L);

        // Verify that the repository's delete method is called with ID 1
        verify(userRepository, times(1)).deleteById(1L);

        // Verify that the repository's findById method is not called
        verify(userRepository, never()).findById(anyLong());
    }





    @Test
    public void testAuthenticateUser() {
        // Mock the repository response
        User user = new User(1L, "John");
        when(userRepository.findByUsernameAndPassword("john", "password")).thenReturn(Optional.of(user));

        // Call the service method
        Optional<User> result = userService.authenticateUser("john", "password");

        // Check the result
        assertEquals(Optional.of(user), result);
    }
/*
    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    public void testAdminEndpointAccess() {
        // Mock the repository response
        User adminUser = new User(1L, "admin");
        when(userRepository.findByUsername("admin")).thenReturn(adminUser);

        // Retrieve the current authenticated user
        org.springframework.security.core.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authenticatedUsername = authentication.getName();

        // Call a protected endpoint that requires ADMIN role
        // Call a protected method that requires ADMIN role
        String adminMethodResult = userService.adminMethod();

        // Assert that the current authenticated user has access to the admin method
        assertEquals("Hello admin!", adminMethodResult);
        assertEquals("admin", authenticatedUsername);
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testUserEndpointAccess() {
        // Mock the repository response
        User regularUser = new User(2L, "user");
        when(userRepository.findByUsername("user")).thenReturn(Optional.of(regularUser));

        // Retrieve the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authenticatedUsername = authentication.getName();

        // Call a protected endpoint that requires USER role
        String userEndpointResult = userService.userEndpoint();

        // Assert that the current authenticated user has access to the user endpoint
        assertEquals("Hello user!", userEndpointResult);
        assertEquals("user", authenticatedUsername);
    }

    @Test
    public void testUnauthenticatedEndpointAccess() {
        // Call a public endpoint without authentication
        String publicEndpointResult = userService.publicEndpoint();

        // Assert that the public endpoint is accessible without authentication
        assertEquals("Public endpoint", publicEndpointResult);
    }
*/
}



