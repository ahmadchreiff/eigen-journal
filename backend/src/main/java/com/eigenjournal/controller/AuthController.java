package com.eigenjournal.controller;

import com.eigenjournal.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth") // every endpoint in this file starts with /api/auth
public class AuthController {

    private final JwtUtil jwtUtil;

    // Simple in-memory admin credentials
    private final String ADMIN_EMAIL = "admin@eigenjournal.com";
    private final String ADMIN_PASSWORD = "eigenjournalpassword3232";

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        if (ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password)) {
            String token = jwtUtil.generateToken(email, "ADMIN");
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }
}
