package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// Specifies the base packages to scan for entity classes
@EntityScan(basePackages = {"com.example.backend.models"})
// Indicates that this class is the main entry point for the Spring Boot application
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class TaskManagementApplication {

	public static void main(String[] args) {
		// Starts the Spring Boot application
		SpringApplication.run(TaskManagementApplication.class, args);
	}

}
