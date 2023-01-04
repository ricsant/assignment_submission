package br.com.coderscampus.AssignmentSubmissionApp.dto;

import br.com.coderscampus.AssignmentSubmissionApp.domain.Assignment;
import br.com.coderscampus.AssignmentSubmissionApp.enums.AssignmentEnum;
import br.com.coderscampus.AssignmentSubmissionApp.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {
	
	private Assignment assignment;
	private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
	private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
	
	public AssignmentResponseDto(Assignment assignment) {
		super();
		this.assignment = assignment;
	}
	
	public Assignment getAssignment() {
		return assignment;
	}
	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
	}
	public AssignmentEnum[] getAssignmentEnums() {
		return assignmentEnums;
	}

	public AssignmentStatusEnum[] getStatusEnums() {
		return statusEnums;
	}
	

}
