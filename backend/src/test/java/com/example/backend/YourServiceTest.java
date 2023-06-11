package com.example.backend;

import com.example.backend.services.TaskService;
import com.example.backend.services.UserService;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class YourServiceTest {


    @InjectMocks
    private TaskService taskService;

    @InjectMocks
    private UserService userService;

    @Before
    public void setUp() {
        // Set up any necessary initialization or configuration
    }

    // Add your test methods here

}
