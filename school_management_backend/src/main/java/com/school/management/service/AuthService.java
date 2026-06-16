package com.school.management.service;

import com.school.management.dto.LoginRequestDTO;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority();
        return jwtSerivce.generateToken(loginRequest.getUsername(), role);}
}
