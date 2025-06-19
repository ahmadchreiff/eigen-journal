package com.eigenjournal.dto;

import java.util.List;        // add
import lombok.Data;

@Data
public class DraftRequest {

    // --- Author info ---
    public String firstName;
    public String lastName;
    public String email;
    public String studentId;
    public String affiliation;
    public String year;
    public String major;

    // --- Article info ---
    public String title;
    public String abstractText;
    public String category;   // cmps, math, phys
    public List<String> keywords;   // ← was String

    // You can later add validation annotations like @NotBlank, @Email, etc.
}
