
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import "./loginModal.css";
import logo from "../../Assets/Logo2.png";
import SignUp from "../singUpModal/SignUpModal.js";
import { useEffect } from 'react';



const LoginModal = ({ show, onClose, handleLogin,port,setShowSignUpModal}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    

    
    
    if (!show) {
        console.log("show girdi:",show)
        return null;
    }
 
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('type of email:',typeof(email))
        console.log("type of password:",typeof(password))
        console.log('Password:', password);

        axios.post(`http://localhost:${port}/postUserLogin`, {
        email: email,
        password: password
        }).then((response) => {
            console.log("response",response.data);
            handleLogin(response.data.token,response.data.user);
            console.log("login:",response.data.token);
            setErrorMessage('');
            setEmail('');
            setPassword('');
            onClose();
            }
        ).catch((error) => {
            console.log(error);
            setErrorMessage("Invalid email or password");
        })
  
    };
    
    const changeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const changePassword=(e)=>{
        setPassword(e.target.value);
    
    }
    const handleToggleSignUp = () => {
        setIsSignUp(!isSignUp); // Toggle signup mode
    };
    const handleClose = () => {
        onClose();
        setIsSignUp(false); // Reset sign-up state on close
    };
  
    return (
        <div className='overlay'>
            <div className='login-container'>
            <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            
            <div className="p-4 bg-white shadow rounded" style={{ width: '300px' }}>
            <div className='close-button-container'>
                    <Button className="close-button" onClick={handleClose}>X</Button>
            </div>
            
            
           
           
           {isSignUp ? ( // Render SignUp component if in signup mode
                <SignUp onClose={handleToggleSignUp} port={port}  onCloseSign={handleToggleSignUp}/>
            ) :(
                <>
                <img src={logo} alt="peata-logo" border="0" className="logo" width={"100px"} height={"100px"}/>
                 <h2 className="text-center mb-4">Log in to Peata</h2>
                 
                {errorMessage && (
                    <Alert variant="danger" className="mb-3">
                        {errorMessage}
                    </Alert>
                )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                        
                        <Form.Control
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={changeEmail}
                            className="mb-3"
                        />
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={changePassword}
                            className="mb-3"
                        />
                            

                        </Form.Group>
            
                        <Button
                        type='submit'
                        variant="primary"
                        className="w-100 mb-2"
                        
                        >
                        Login
                        </Button>
                    </Form>
            
                    <Alert variant="link" className="text-center p-0" onClick={handleToggleSignUp}>
                        Don't have an account yet? Sign up
                    </Alert>
                </>
            )}
            </div>
        </Container>
        </div>
        </div>
    );
  };
  
  export default LoginModal;