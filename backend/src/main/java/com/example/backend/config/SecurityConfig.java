/*package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;


*/

/*
@Configuration
@EnableWebSecurity
public class SecurityConfig {



*/

/*

    private UserDetailsService userDetailsService;

    public void setUserDetailsService(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }




    // Configures the security filter chain to define authorization rules.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http


                /*.authorizeHttpRequests(authConfig -> {
                    authConfig.requestMatchers("/").permitAll();
                    authConfig.requestMatchers("/user/**").authenticated();
                    authConfig.requestMatchers("/admin/**").denyAll();
                })*/
                //.formLogin(Customizer.withDefaults()) // Login with browser and Form
                //.httpBasic(Customizer.withDefaults()) // Login with Insomnia and Basic Auth
   /*             .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable);


        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        if (userDetailsService != null) {
            auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        }
    }
}
*/