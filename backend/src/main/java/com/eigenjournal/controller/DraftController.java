package com.eigenjournal.controller;

import com.eigenjournal.dto.DraftRequest;
import com.eigenjournal.model.Draft;
import com.eigenjournal.service.DraftService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

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
            @RequestParam("pdf") MultipartFile pdfFile) throws IOException {

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

    @GetMapping // GET /api/drafts
    public List<Draft> getAllDrafts() {
        return draftService.getAllDrafts(); // returns List<Draft>
    }

    @GetMapping("/{id}") // GET /api/drafts/7
    public ResponseEntity<?> getDraftById(@PathVariable Long id) {
        return draftService.getDraft(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Draft not found")));
    }

    @DeleteMapping("/{id}") // DELETE /api/drafts/7
    public ResponseEntity<?> deleteDraft(@PathVariable Long id) {
        boolean ok = draftService.deleteDraft(id);
        return ok ? ResponseEntity.ok(Map.of("deleted", true))
                : ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Draft not found"));
    }

    @PutMapping("/{id}") // PUT /api/drafts/7
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        boolean ok = draftService.updateStatus(id, status);
        return ok ? ResponseEntity.ok(Map.of("updated", true))
                : ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Draft not found"));
    }

}
