import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateLogin } from "../../../utils/validation/FormValidation";
import { useNavigate } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validateLogin)
  });
  const handleLogin = async (data) => {
    if (data) {
      navigate("/dashboard");
    } else {
      alert("Wrong username or password.");
    }
  }

  return  <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <h1 className="text-center">Forget Password ?</h1>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Form onSubmit={handleSubmit(handleLogin)}>
                    <Form.Group className="mb-3" controlId="formLoginUsername">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter username" {...register("username")} />
                      <p className="error">{errors.username?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLoginPassword">
                      <Form.Label>OTP</Form.Label>
                      <Form.Control type="Number"  placeholder="Enter password" {...register("password")} />
                      <p className="error">{errors.password?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLoginPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type="text" placeholder="Enter password" {...register("password")} />
                      <p className="error">{errors.password?.message}</p>
                    </Form.Group>
                    <div className="form-actions">
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                      <Link to="/admin/login" className="main-link">Login Account?</Link>
                    </div>
                  </Form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
}

export default ForgotPassword
