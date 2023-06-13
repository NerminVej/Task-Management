package com.example.backend.security;

import com.example.backend.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private User user; // Replace 'User' with your actual user entity class

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Return the user's authorities/roles
        // You can define and manage authorities/roles in your application as needed
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        // Implement account expiration logic if needed
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Implement account locking logic if needed
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Implement credentials expiration logic if needed
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Implement user enabled/disabled logic if needed
        return true;
    }
}
