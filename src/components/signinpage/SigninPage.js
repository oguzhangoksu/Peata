/* Genel stil ayarları */
import axios from 'axios';
import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  {Button, Form, Modal}  from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import './Signin.css';
import { useNavigate } from 'react-router-dom';

function SigninPage(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [city,setCity]=useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log('Signing up with:', name,surname,username,phone,city,address,email, password,confirmPassword);
        
        
        axios.post(`http://localhost:${props.port}/postUserRegister`, {
            name: name,
            surname: surname,
            user_name: username,
            phone: phone,
            city: city,
            address: address,
            email: email,
            password: password
        }).then(response => {
            console.log(response.data);
            //props.handleSignup(response.data.token, response.data.user);
            return navigate('/login');
        }).catch(error => {
            console.log(error);
            return alert("Giriş yaparken hata meydana geldi.");
        });
        
    };

    return (
        <section >
            <Form className='login-form'></Form>
            <Container fluid className='signin-content'> 
            <h2>Sign In</h2>
            <form onSubmit={handleSignup}>
                <Row> 
                    <Col md={{ span: 6, offset: 3 }}>
                    <div>
                    <label>
                        Name:
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div> 
                </Col>
                </Row>
                
                <Row> <Col md={{ span: 6, offset: 3 }}>
                     <div>
                    <label>
                        Surname:
                        <input
                            type="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div></Col></Row>
                
                <Row> <Col md={{ span: 6, offset: 3 }}> <div>
                    <label>
                        Username:
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div></Col></Row>
                
                <Row> <Col md={{ span: 6, offset: 3 }}> <div>
                    <label>
                        Phone:
                        <input
                            type="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div></Col></Row>
                
                <Row> <Col md={{ span: 6, offset: 3 }}> 
                <div>
                    <label>
                        City:
                        <input
                            type="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div> </Col></Row>
                
                <Row> <Col md={{ span: 6, offset: 3 }}> 
                <div>
                    <label>
                        Address:
                        <input
                            type="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div>
                </Col></Row>
                
                <Row> <Col md={{ span: 6, offset: 3 }}>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div>
                </Col>
                </Row>
                
                <Row> 
                    <Col md={{ span: 6, offset: 3 }}> 
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div></Col>
                </Row>
                
                <Row> 
                    <Col md={{ span: 6, offset: 3 }}> 
                <div>
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </label>
                </div>
                </Col>
                </Row>
                <Row> 
                    <Col md={{ span: 6, offset: 3 }}>
                
                        <Button type="submit" className="button">Sign Up</Button>
                    </Col>
                </Row>
            </form>
            
            </Container>
        </section>
    );
}

export default SigninPage;
