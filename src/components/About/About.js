import React from "react";
import {Container, Row, Col, Card } from "react-bootstrap";
import logo from "../../Assets/Logo2.png"
import "./about.css";

function About(props) {
  return (
    <section>
    <Container fluid className="home-about-content" id="about">
    <Container className="about-content"></Container>
     <Row className="equal-height-row">
        <h5 className="title">About Us</h5>
        <Card>
            <Card.Img variant="top" src="https://www.welovepetssa.co.za/assets/img/NEWlogoV2.webp" className="card-img2" ></Card.Img>
            <Card.Body><h4>At Peata, we're passionate about adoption. It's not just about finding homes for pets and strays; 
            it's about transforming lives. We believe in second chances, in providing love, care, and support to animals in need.
            Join us in our mission to embrace adoption. Together, let's make a difference and give every furry friend the loving home they deserve.</h4>
            </Card.Body>
        </Card>

        <Col md={1} className="home-header"></Col>
        <title>We want to help all animals, whether adopt or stray.</title>
            <Col md={3}>
               <Card  className="Card-animation">
                 <Card.Img variant="top" src="https://i0.wp.com/www.therealdealmedspa.com/wp-content/uploads/2021/01/our-vision.png?fit=1266%2C810" className="card-img" />
                 <Card.Body>
                 <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
                   <Card.Title>Our Vision</Card.Title>
                   <Card.Text>Our vision is simple yet profound: a world where every pet finds a loving home and every stray animal is embraced with compassion.
                   Together, let's create a future where love knows no bounds, and every animal has the chance to thrive in a forever home.
                   </Card.Text>
                   </div>  
                 </Card.Body>
               </Card>
             </Col>

             <Col md={4}>
               <Card  className="Card-animation">
                 <Card.Img variant="top" src={logo} className="card-img3" />
                 <Card.Body>
                 <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
                   <Card.Title>Our Project</Card.Title>
                   <Card.Text>Our project is dedicated to facilitating pet and stray animal adoption. We connect animals with loving homes, provide support for successful transitions, and advocate for responsible ownership. 
                   Join us in making a difference—one adoption at a time.
                   </Card.Text>
                   </div>  
                 </Card.Body>
               </Card>
             </Col>

             <Col md={3}>
               <Card  className="Card-animation">
                 <Card.Img variant="top" src="https://ohpag.org/wp-content/uploads/2019/11/our-mission.png" className="card-img" />
                 <Card.Body>
                 <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
                   <Card.Title>Our Mission</Card.Title>
                   <Card.Text>To promote and facilitate the adoption of pets and stray animals, ensuring they find loving homes and advocating for responsible pet ownership to create a compassionate community.</Card.Text>
                   </div>  
                 </Card.Body>
               </Card>
             </Col>
        </Row>
    </Container>
    </section>
  );
}

export default About;
