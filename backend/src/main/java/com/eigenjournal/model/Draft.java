package com.eigenjournal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Data                           // adds getters, setters, toString, etc.
@Entity
@Table(name = "drafts")
public class Draft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- author info ---
    private String firstName;
    private String lastName;
    private String email;
    private String studentId;
    private String affiliation;
    private String year;
    private String major;

    // --- article info ---
    private String title;
    @Column(length = 2000)   // long abstracts
    private String abstractText;
    private String category;         // cmps / math / phys
    private String keywords;         // comma‑separated

    // --- file & meta ---
    private String pdfFileName;      // stored filename
    private LocalDateTime createdAt;
    private String status;           // PENDING_REVIEW

    /* getters and setters omitted for brevity;
       using Lombok. */
}
