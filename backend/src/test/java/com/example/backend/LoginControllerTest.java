package com.example.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @BeforeEach
    void setUp() {
        // Configure RestTemplate with HttpMessageConverters
        restTemplate.getRestTemplate().getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    }

    @Test
    void testLogin() {
        // Create the request body
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", "john@example.com");
        requestBody.put("password", "password123");

        // Create the request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create the request entity with body and headers
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Send the login request
        ResponseEntity<String> response = restTemplate.exchange("/login", HttpMethod.POST, requestEntity, String.class);




        // Add checks for request body
        assertNotNull(requestBody, "Request body should not be null");
        assertTrue(requestBody.containsKey("email"), "Request body should contain 'email' field");
        assertTrue(requestBody.containsKey("password"), "Request body should contain 'password' field");

        // Add checks for request headers
        assertNotNull(headers, "Request headers should not be null");
        assertEquals(MediaType.APPLICATION_JSON, headers.getContentType(), "Unexpected content type in request headers");

        // Add checks for request entity
        assertNotNull(requestEntity, "Request entity should not be null");
        assertEquals(requestBody, requestEntity.getBody(), "Request entity body does not match");

        // Add checks for login endpoint
        assertNotNull(response, "Login response should not be null");
        // Check if the request was successful (2xx status code)
        if (response.getStatusCode().is2xxSuccessful()) {
            // Assert the response body
            assertNotNull(response.getBody(), "Response body should not be null");

            // Add additional checks to investigate the response
            // For example, check if the response contains expected data
            assertTrue(response.getBody().contains("Welcome"), "Unexpected response content");
        } else {
            // Handle unsuccessful request
            String responseBody = response.getBody();
            fail("Login request failed with status code: " + response.getStatusCodeValue() + "\nResponse body: " + responseBody);

        }


    }
}
