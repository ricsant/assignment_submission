package br.com.coderscampus.AssignmentSubmissionApp.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.coderscampus.AssignmentSubmissionApp.domain.Assignment;
import br.com.coderscampus.AssignmentSubmissionApp.domain.User;
import br.com.coderscampus.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import br.com.coderscampus.AssignmentSubmissionApp.repository.AssignmentRepository;

@Service
public class AssignmentService {

	@Autowired
	private AssignmentRepository assignmentRepository;

	public Assignment save(User user) {
		Assignment assignment = new Assignment();
		assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
		assignment.setNumber(findNextAssignmentToSubmit(user));
		assignment.setUser(user);
		return assignmentRepository.save(assignment);
	}

	private Integer findNextAssignmentToSubmit(User user) {
		Set<Assignment> assignmentByUser = assignmentRepository.findByUser(user);

		if (assignmentByUser == null) {
			return 1;
		}

		Optional<Integer> nextAssignmentNumOpt = assignmentByUser.stream().sorted((a1, a2) -> {
			if (a1.getNumber() == null)
				return 1;
			if (a2.getNumber() == null)
				return 1;
			return a2.getNumber().compareTo(a1.getNumber());
		}).map(assignment -> {
			if (assignment.getNumber() == null)
				return 1;
			return assignment.getNumber() + 1;
		}).findFirst();

		return nextAssignmentNumOpt.orElse(1);
	}

	public Set<Assignment> findByUser(User user) {
		return assignmentRepository.findByUser(user);
	}

	public Optional<Assignment> findById(Long assignmentId) {
		return assignmentRepository.findById(assignmentId);
	}

	public Assignment save(Assignment assignment) {
		return assignmentRepository.save(assignment);
	}

}
