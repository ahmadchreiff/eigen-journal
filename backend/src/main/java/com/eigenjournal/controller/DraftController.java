package com.eigenjournal.controller;

import com.eigenjournal.dto.DraftRequest;
import com.eigenjournal.service.DraftService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/drafts")
@CrossOrigin(origins = "http://localhost:3000") // allow dev frontend access
public class DraftController {

    private final DraftService draftService;
    private final ObjectMapper objectMapper;

    @Autowired
    public DraftController(DraftService draftService, ObjectMapper objectMapper) {
        this.draftService = draftService;
        this.objectMapper = objectMapper;
    }

    @PostMapping
    public Map<String, Object> submitDraft(
            @RequestParam("metadata") String metadataJson,
            @RequestParam("pdf") MultipartFile pdfFile
    ) throws IOException {

        // Parse metadata JSON into DraftRequest
        DraftRequest draftRequest = objectMapper.readValue(metadataJson, DraftRequest.class);

        // Save and get ID
        Long id = draftService.submitDraft(draftRequest, pdfFile);

        // Response
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("draftId", id);
        return response;
    }
}
