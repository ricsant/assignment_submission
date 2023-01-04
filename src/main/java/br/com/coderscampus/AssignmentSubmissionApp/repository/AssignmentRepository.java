package br.com.coderscampus.AssignmentSubmissionApp.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.coderscampus.AssignmentSubmissionApp.domain.Assignment;
import br.com.coderscampus.AssignmentSubmissionApp.domain.User;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    public Set<Assignment> findByUser(User user);
    
}
