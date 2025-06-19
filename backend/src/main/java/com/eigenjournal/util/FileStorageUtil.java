package com.eigenjournal.util;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class FileStorageUtil {

    private static final String UPLOAD_DIR = "uploads";

    public String savePdf(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Cannot store empty file.");
        }

        // ✔ build absolute path rooted at project directory
        Path uploadPath = Paths.get(System.getProperty("user.dir"), "uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath); // creates if missing

        String ext = file.getOriginalFilename().endsWith(".pdf") ? ".pdf" : "";
        String newFilename = UUID.randomUUID() + ext;

        Path dest = uploadPath.resolve(newFilename);
        file.transferTo(dest.toFile());

        return newFilename; // store just the filename in DB
    }
}
