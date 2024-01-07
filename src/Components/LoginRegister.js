import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
  };

  //handling user registration

  const handleRegiter = () => {
    const user = {
      email,
      password,
      confirmPassword,
    };
    if (
      user != null &&
      user.password === user.confirmPassword &&
      user.email !== "" &&
      user.password !== ""
    ) {
      users.push(user);
      setUsers(users);

      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setError("Please enter user data");
      return;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const getUsers = JSON.parse(localStorage.getItem("users"));
    console.log(getUsers);
    const isValidUser = getUsers.some(
      (user) => user.email === email && user.password === password
    );

    const validUser = getUsers.find(
      (user) => user.email === email && user.password === password
    );
    console.log(validUser);

    if (isValidUser) {
      navigate("/dashboard", { state: { data: validUser } });

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Show an error toast notification for invalid login
      toast.error("Invalid credentials. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">{isRegister ? "Register" : "Login"}</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {isRegister && (
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            )}

            {isRegister && (
              <Button
                variant="primary"
                type="submit"
                className="mt-2 btn btn-sm"
                onClick={handleRegiter}
              >
                Register
              </Button>
            )}
            {!isRegister && (
              <Button
                variant="primary"
                type="submit"
                className="mt-2 btn btn-sm"
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
            <br />
            <Button
              variant="warning"
              className="btn btn-sm my-5 w-50"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? " Login" : "Register"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginRegister;
