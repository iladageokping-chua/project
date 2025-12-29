import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Alert, Button } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import './form.css'; // เพิ่มไฟล์ CSS สำหรับการจัดการความสวยงามของฟอร์ม

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <div className="form-container"> {/* เพิ่มคลาส CSS สำหรับจัดกลางฟอร์ม */}
      <div className="row">
        <div className="col-md-4 mx-auto">
          <h2 className="mb-3" id="Register_color">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
          <div className="p-4 box mt-3 text-center">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
