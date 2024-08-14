import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    if (!username || !password) {
      alert("Please enter both username and password.");
    } else if (username !== localStorage.getItem("username") || password !== localStorage.getItem("password")) {
      alert("Wrong username or password.");
    } else {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formLoginUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control ref={usernameRef} type="text" placeholder="Enter username" defaultValue="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLoginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control ref={passwordRef} type="text" placeholder="Entere password" defaultValue="" />
                    </Form.Group>
                    <div className="form-actions">
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                      <Link to="/forgot-password" className="main-link">Forgot Password?</Link>
                    </div>
                  </Form>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
