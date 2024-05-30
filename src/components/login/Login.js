import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import "./LoginPage.css";
import {useNavigate}  from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
function Login (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    // Handle submission of email and password (e.g., send them to a backend server for authentication)
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    axios.post(`http://localhost:${props.port}/postUserLogin`, {
      email: email,
      password: password
    }).then((response) => {
        console.log(response.data);
        props.handleLogin(response.data.token,response.data.user);
        console.log("login:",response.data.token);
        navigate("/");
        }
    ).catch((error) => {
        console.log(error);
        alert("Invalid email or password");
    })
  };
  
  function handleSignup(){
    navigate('/signin');
  }

  return (
    <section>
        <Container fluid className="login-content">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                  <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <label>Email:</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Col>
                  </Row>
                </div>
                
                <div>
                  <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <label>Password:</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col md={{ span: 6, offset: 3 }}>
                  
                    <button type="submit" className='animated-button'>Login</button>
                  </Col>
                </Row>
                <div className="linkContainer">
                    
                    <a onClick={handleSignup} className="linkButton">
                        Don't you have an account? Sign up
                        <span className="wave" role="img" aria-labelledby="wave" >
                            👋🏻
                        </span>
                    </a>
                </div>
            </form>
        </Container>
    </section>
  );
};

export default Login;