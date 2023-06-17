package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Here, we define the CORS mapping configuration for our API endpoints.
        // The "/api/**" pattern specifies that all API endpoints under "/api" are included.
        registry.addMapping("/api/**")
                // We allow requests from the specified origin, "http://localhost:3000".
                .allowedOrigins("http://localhost:3000")
                // We allow the following HTTP methods: GET, POST, PUT, and DELETE.
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                // We allow any headers to be included in the request.
                .allowedHeaders("*");
    }

}
