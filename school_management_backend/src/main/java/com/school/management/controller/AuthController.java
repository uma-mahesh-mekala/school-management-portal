package com.school.management.controller;

import com.school.management.dto.LoginRequestDTO;
import com.school.management.dto.LoginResponseDTO;
import com.school.management.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody  LoginRequestDTO logicRequest,
            HttpServletResponse response
    ) {
        String accessToken = authService.login(logicRequest);
        LoginResponseDTO loginResponse = new LoginResponseDTO(accessToken);

        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }

    @GetMapping("/validate")
    public ResponseEntity<Void> validate() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
