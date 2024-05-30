import axios from 'axios';
import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './LoginPage.css'; 
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleSubmit() {
        console.log('Email:', email);
        console.log('Password:', password);
        axios.post(`http://localhost:${props.port}/postUserLogin`, {  //api isteği gönderme
          email: email,
          password: password
        }).then((response) => {
            console.log(response.data);
            props.handleLogin(response.data.token,response.data.user);
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
            <Container fluid className='login-content'>
            <h2>Login</h2>
            
            <form onSubmit={(e)=>handleSubmit(e)}>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
            <div class="input-group mb-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" ></input>
            </div>
            </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
            </div>
            </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                <Button type="submit" className="button"  >Login</Button>
                <div className="linkContainer">
                    
                    <a onClick={handleSignup} className="linkButton">
                        Don't you have an account? Sign up 
                    </a>
                </div>
                </Col>
            </Row>
                
            </form>
            </Container>
        </section>
    );
}

export default LoginPage;
