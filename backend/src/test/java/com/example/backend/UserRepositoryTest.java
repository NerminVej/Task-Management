package com.example.backend;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

public class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testFindByEmailIgnoreCase() {
        // Initializes Mockito annotations
        MockitoAnnotations.openMocks(this);

        // Creates a sample email for testing
        String email = "john@example.com";

        // Creates a sample user with the given email
        User user = new User();
        user.setEmail(email);

        // Mocks the behavior of the userRepository.findByEmailIgnoreCase method
        when(userRepository.findByEmailIgnoreCase(email)).thenReturn(Optional.of(user));

        // Calls the userRepository.findByEmailIgnoreCase method
        Optional<User> result = userRepository.findByEmailIgnoreCase(email);
        System.out.println("it found " + result);

        // Verifys the result
        assertEquals(Optional.of(user), result);
        assertNotNull(result.get().getId());
        assertNotNull(result.get().getUsername());
        assertNotNull(result.get().getPassword());
    }
}
