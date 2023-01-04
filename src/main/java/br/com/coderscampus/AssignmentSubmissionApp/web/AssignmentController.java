package br.com.coderscampus.AssignmentSubmissionApp.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.coderscampus.AssignmentSubmissionApp.domain.Assignment;
import br.com.coderscampus.AssignmentSubmissionApp.domain.User;
import br.com.coderscampus.AssignmentSubmissionApp.dto.AssignmentResponseDto;
import br.com.coderscampus.AssignmentSubmissionApp.service.AssignmentService;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;
    
    @PostMapping("create")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(assignmentService.findByUser(user));
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignmentById(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId); 
        
        AssignmentResponseDto response = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId, @RequestBody Assignment assignment, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(assignmentService.save(assignment));
    }

}
