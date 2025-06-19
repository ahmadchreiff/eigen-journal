package com.eigenjournal.service;

import com.eigenjournal.dto.DraftRequest;
import com.eigenjournal.model.Draft;
import com.eigenjournal.repository.DraftRepository;
import com.eigenjournal.util.FileStorageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class DraftService {

    private final DraftRepository draftRepository;
    private final FileStorageUtil fileStorageUtil;

    @Autowired
    public DraftService(DraftRepository draftRepository, FileStorageUtil fileStorageUtil) {
        this.draftRepository = draftRepository;
        this.fileStorageUtil = fileStorageUtil;
    }

    public Long submitDraft(DraftRequest request, MultipartFile pdfFile) throws IOException {
        // Save the file
        String storedFileName = fileStorageUtil.savePdf(pdfFile);

        // Build the Draft entity from request
        Draft draft = new Draft();
        draft.setFirstName(request.firstName);
        draft.setLastName(request.lastName);
        draft.setEmail(request.email);
        draft.setStudentId(request.studentId);
        draft.setAffiliation(request.affiliation);
        draft.setYear(request.year);
        draft.setMajor(request.major);
        draft.setTitle(request.title);
        draft.setAbstractText(request.abstractText);
        draft.setCategory(request.category);
        // draft.setKeywords(request.keywords);
        draft.setKeywords(
                request.getKeywords() == null
                        ? null
                        : request.getKeywords().stream().collect(Collectors.joining(",")));
        draft.setPdfFileName(storedFileName);
        draft.setCreatedAt(LocalDateTime.now());
        draft.setStatus("PENDING_REVIEW");

        // Save to DB
        Draft savedDraft = draftRepository.save(draft);

        return savedDraft.getId();
    }
}
