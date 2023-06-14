package com.example.backend.repositories;

import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM users WHERE LOWER(email) = LOWER(:email)", nativeQuery = true)
    Optional<User> findByEmailIgnoreCase(@Param("email") String email);

    Optional<User> findByUsernameAndPassword(String username, String password);

    User findByUsername(String username);
}
