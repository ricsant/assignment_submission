import React, { useState, useEffect, useRef } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import ajax from '../Services/fetchService';
import { useLocalState } from '../util/useLocalStorage';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        githubUrl: "",
        branch: "",
        number: null,
        status: null,
    });

    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);

    // para ter os valores atuais da tela, pois estamos fazendo chamadas assincronas
    const prevAssignmentValue = useRef(assignment);

    function updateAssignment(prop, value) {
        const newAssignment = { ...assignment };
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        // this implies that the student is submitting the assignment for the first time
        if (assignment.status === assignmentStatuses[0].status) {
            updateAssignment("status", assignmentStatuses[1].status);
        } else {
            persist();
        }
    }

    function persist() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignmentData) => {
                setAssignment(assignmentData);
            });
    }

    useEffect(() => {
        // se teve mudança de status, manda salvar os dados
        if (prevAssignmentValue.current.status !== assignment.status) {
            persist();
        }

        prevAssignmentValue.current = assignment;
    }, [assignment]);

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
            (assignmentResponse) => {
                let assignmentData = assignmentResponse.assignment;
                if  (assignmentData.branch === null) assignment.branch = "";
                if  (assignmentData.githubUrl === null) assignment.githubUrl = "";
                setAssignment(assignmentData);
                setAssignmentEnums(assignmentResponse.assignmentEnums);
                setAssignmentStatuses(assignmentResponse.statusEnums);
          });
      }, []);

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    {assignment.number ? (
                        <h1>Assignment {assignment.number}</h1>
                    )   : (
                        <></>
                    )}
                </Col>
                <Col>
                    <Badge pill bg="info" style={{ fontSize: "1em" }}>
                        {assignment.status}
                    </Badge>
                </Col>
            </Row>
            {assignment ? (
                <>
                    <Form.Group as={Row} className="my-4" controlId="githubUrl">
                        <Form.Label column sm="3" md="2">
                            Assignment Name:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <DropdownButton
                                as={ButtonGroup}
                                id="assignmentName"
                                variant={'info'}
                                title={assignment.number ? `Assignment ${assignment.number}` : "Select an Assignment"}
                                onSelect={(selectedElement) => {
                                    updateAssignment("number", selectedElement);
                                }}
                            >
                                {assignmentEnums.map((assignmentEnum) => (
                                    <Dropdown.Item 
                                        key={assignmentEnum.assignmentNum} 
                                        eventKey={assignmentEnum.assignmentNum}>
                                        {assignmentEnum.assignmentNum}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-4" controlId="githubUrl">
                        <Form.Label column sm="3" md="2">
                            GitHub URL:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control type="url" placeholder="https://github.com/username/reponame" onChange={(e) => updateAssignment("githubUrl", e.target.value)} value={assignment.githubUrl} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="branch">
                        <Form.Label column sm="3" md="2">
                            Branch:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control type="text" placeholder="branch_name" onChange={(e) => updateAssignment("branch", e.target.value)} value={assignment.branch} />
                        </Col>
                    </Form.Group>

                    <div className="d-flex gap-4">
                        <Button size="lg" onClick={() => save()}>Submit Assignment</Button>
                        <Button size="lg" variant="secondary" onClick={() => window.location.href="/dashboard"}>Back</Button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default AssignmentView;