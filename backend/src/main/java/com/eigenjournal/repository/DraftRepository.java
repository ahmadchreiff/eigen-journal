package com.eigenjournal.repository;

import com.eigenjournal.model.Draft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DraftRepository extends JpaRepository<Draft, Long> {
    // Custom query methods can be added later, e.g.:
    // List<Draft> findByStatus(String status);
}
