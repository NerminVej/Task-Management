package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfiguration {

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeExchange()
                .pathMatchers("/public/**").permitAll() // Allow public access to certain URLs
                .pathMatchers("/admin/**").hasRole("ADMIN") // Restrict access to "/admin/**" URLs to users with the "ADMIN" role
                .anyExchange().authenticated() // Require authentication for any other request
                .and()
                .formLogin()
                // Specifies the custom login page URL
                .loginPage("/login")
                // Allows access to the login page
                .permitAll()
                .and()
                .logout()
                // Specifies the logout URL
                .logoutUrl("/logout")
                // Specifies the redirect URL after successful logout
                .logoutSuccessUrl("/login?logout")
                // Invalidates the session upon logout
                .invalidateHttpSession(true)
                // Deletes the JSESSIONID cookie upon logout
                .deleteCookies("JSESSIONID");
    }




    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
