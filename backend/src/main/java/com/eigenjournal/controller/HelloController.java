package com.eigenjournal.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController               // marks this class as an HTTP controller
public class HelloController {

    @GetMapping("/api/hello") // handles GET /api/hello
    public Map<String, String> hello() {
        return Map.of(
            "message", "Backend is alive 🚀",
            "timestamp", String.valueOf(System.currentTimeMillis())
        );
    }
}
