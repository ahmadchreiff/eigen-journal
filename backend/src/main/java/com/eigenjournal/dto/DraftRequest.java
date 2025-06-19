package com.eigenjournal.dto;

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
    public String keywords;   // comma-separated

    // You can later add validation annotations like @NotBlank, @Email, etc.
}
