package com.school.management.service;

import com.school.management.dto.LoginRequestDTO;
import com.school.management.entity.AppUser;
import com.school.management.mapper.UserMapper;
import com.school.management.repository.AppUser.AppUserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private JwtService jwtSerivce;
    private AppUserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtSerivce,
            AppUserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtSerivce = jwtSerivce;
        this.userRepository=userRepository;
        this.passwordEncoder = passwordEncoder;
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
        return jwtSerivce.generateToken(loginRequest.getUsername(), role);
    }

    public void createUser(String username, String password, String role) {
        AppUser newUser = UserMapper.toEntity(username, passwordEncoder.encode(password), role);

        userRepository.save(newUser);
    }
}
