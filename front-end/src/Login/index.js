import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Button, Container, FormGroup, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");
  
    function sendLoginRequest() {
        const reqBody = {
            username : username,
            password : password
        };

        fetch("api/auth/login", {
        headers: {
            "Content-type":"application/json",
        },
        method:"post",
        body: JSON.stringify(reqBody)
        })
        .then((response) => {
            if (response.status === 200)
                return Promise.all([response.json(), response.headers]);
            else
                return Promise.reject("Invalid login attempt");
        })
        .then(([body, headers]) => {
            setJwt(headers.get("AUTHORIZATION"));
            window.location.href = "dashboard";
        })
        .catch((message) => {
            alert(message);
        });
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className='fs-4'>Username</Form.Label>
                            <Form.Control type="text" size="lg" placeholder="Type in your user name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                    </Col> 
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className='fs-4'>Password</Form.Label>
                            <Form.Control type="password" size="lg" placeholder="Type in your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Col> 
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6" className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-md-between">
                        <Button 
                            id="submit" 
                            type="button" 
                            size="lg" 
                            variant="primary"
                            onClick={() => sendLoginRequest()}>
                            Login
                        </Button>
                        <Button 
                            type="button" 
                            size="lg" 
                            variant="secondary"
                            onClick={() => window.location.href="/"}>
                            Exit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;