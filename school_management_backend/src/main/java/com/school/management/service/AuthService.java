package com.school.management.service;

import com.school.management.dto.LoginRequestDTO;
import com.school.management.entity.AppUser;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private JwtService jwtSerivce;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtSerivce
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtSerivce = jwtSerivce;
    }

    public String login(LoginRequestDTO loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        return jwtSerivce.generateToken(loginRequest.getUsername());
    }
}
