import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './signUpModal.css';
import axios from 'axios';

const SignUpModal = ({ onClose, port}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        axios.post(`http://localhost:${port}/postUserRegister`, {
            name: name,
            surname: surname,
            user_name: username,
            phone: phoneNumber,
            city: city,
            address: address,
            email: email,
            password: password
        }).then(response => {
            console.log("burası",response.data);
            if(response.data.error){
                setErrorMessage(response.data.error);
                return;
            }
            else if(response.data.message){
                setName('');
                setSurname('');
                setUsername('');
                setPhoneNumber('');
                setCity('');
                setAddress('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setErrorMessage('');
                
                onClose();
            }
            else if(response.data){
                setErrorMessage(response.data.error);
            }
            //props.handleSignup(response.data.token, response.data.user);
            
        }).catch(error => {
            console.log(error);
            if (error.response) {
                setErrorMessage(error.response.data);
            } 
            else {
                setErrorMessage("An error occurred. Please try again.");
            }
        });
    };

    return (
        <div >
            
            <h2 className="text-center mb-4">Sign Up to Peata</h2>
            {errorMessage && (
                <Alert variant="danger" className="mb-3">
                    {errorMessage}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="small-input mb-2"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formSurname">
                    <Form.Control
                        type='text'
                        placeholder='Surname'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="small-input mb-2"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formUserName">
                    <Form.Control
                        type='username'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="small-input mb-2"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="small-input mb-2"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Control
                        type='tel'
                        placeholder='Phone Number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="small-input mb-2"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCity">
                    <Form.Control
                        as="select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="small-input mb-2"
                        required
                    >
                        <option value="">Select City</option>
                        <option value="İstanbul">İstanbul</option>
                        <option value="Antalya">Antalya</option>
                        <option value="Ankara">Ankara</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Control
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="small-input mb-2"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="small-input mb-2"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="small-input mb-2"
                        required
                    />
                </Form.Group>
                <Button
                    type='submit'
                    variant="primary"
                    className="w-100"
                >
                    Sign Up
                </Button>
            </Form>
            <Alert variant="link" className="text-center p-0 mt-3" onClick={onClose}>
                Already have an account? Log in
            </Alert>
        </div>
    );

};

export default SignUpModal;