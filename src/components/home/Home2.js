import React from "react";
import { Container, Row, Col, Card, ListGroup, CardGroup, Button, Form } from "react-bootstrap";
import axios from "axios";
import logo from "../../Assets/logo4.png";
import logo2 from "../../Assets/logo5-removebg-preview.png";
import logo3 from "../../Assets/logo6-removebg-preview.png";
import logo4 from "../../Assets/logo7-removebg-preview.png";
import logo5 from "../../Assets/logo7_2.png";
import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

function Home2(props) {
  const token=props.token;
  const [approvedAdoptionList,setApprovedAdoptionList]=useState([]);
  const [adoptionFilteredList,setAdoptionFilteredList]=useState([]);
  const [approvedLostList,setApprovedLostList]=useState([]);
  const [lostFilteredList,setLostFilteredList]=useState([]);
  const [city,setCity]=useState("Select City");
  const [breed,setBreed]=useState("Select Breed");
  const [age,setAge]=useState("Select Age");
  const [gender,setGender]=useState("Select Gender");
  const [animalType,setAnimalType]=useState("Select Animal Type");
  const [adtype,setAdType]=useState("Select AdType");

  /*
  useEffect (()=> {
    setAdoptionFilteredList([]);
    console.log(city);
    console.log(breed);
    console.log(age);
    console.log(gender);
    console.log(animalType);
    console.log(adtype);
    let citybutton=document.getElementById("city")
    let breedbutton=document.getElementById("breed")
    let agebutton=document.getElementById("age")
    let genderbutton=document.getElementById("gender")
    let animaltypebutton=document.getElementById("animaltype")
    let adtypebutton=document.getElementById("adtype")
    if(city && breed && age && gender){
      citybutton.innerHTML=city;
      breedbutton.innerHTML=breed;
      agebutton.innerHTML=age;
      genderbutton.innerHTML=gender;
      animaltypebutton.innerHTML=animalType;
      adtypebutton.innerHTML=adtype;

    }
    if(city!="Select City"){
      approvedAdoptionList.filter((adoption)=>{
        if(adoption.city==city){
          setAdoptionFilteredList(adoptionFilteredList=>[...adoptionFilteredList,adoption]);
        }
      })
    }
    if(breed!="Select Breed"){
      adoptionFilteredList.filter((adoption)=>{
        if(adoption.breed==breed){
          setAdoptionFilteredList(adoptionFilteredList=>[...adoptionFilteredList,adoption]);
        }
      })
    }

    console.log("burası",adoptionFilteredList);
   

  },[city,breed,age,gender,animalType,adtype])
*/

  useEffect (()=> {
    axios.get(`http://localhost:${props.port}/getApprovedAdoptionList`)
    .then((response)=>{
      console.log(response.data);
      setApprovedAdoptionList(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    axios.get(`http://localhost:${props.port}/getApprovedLostList`)
    .then((response)=>{
      console.log(response.data);
      setApprovedLostList(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })

  },[])
  
  function handleCardClick(ad_type,ad_id){
    window.location.href=`#view/${ad_type}/${ad_id}`;
  }

  function handleLostSearch(){
    window.location.href="#lost";
  }
  function handleAdoptionSearch(){
    window.location.href="#adoption";
  }

 
  return (
    <Container fluid className="home-about-section" id="about">
     
      <Row className="equal-height-row">
      <h2 className="title">Recent Adoptions</h2>
        {approvedAdoptionList.map((adoption,index)=>{
          if(index<3){
            return(
              <Col md={3}>
                <Card  className="Card-animation" onClick={()=>{handleCardClick("adoption",adoption.ad_id)}}>
                  <Card.Img variant="top" src={adoption.image} className="card-img" />
                  <Card.Body>
                  <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
                    <Card.Title>{adoption.name}</Card.Title>
                    <Card.Text>{adoption.city}</Card.Text>
                    </div>  
                  </Card.Body>
                </Card>
              </Col>
            )
          }
        })}
        <Col md={3}>
          <Card  className="SpecialCard-animation" onClick={()=>{handleAdoptionSearch()}} >
            <div style={{display:"flex",justifyContent:"center"}}>
              <Card.Img variant="top" src={logo2} style={{maxHeight:"250px",maxWidth:"250px"}}/>
            </div>
            <Card.Body>
              
              <Card.Text>Many pets want to meet you.</Card.Text>
              <ListGroup>
                <ListGroup.Item>Adopt Them</ListGroup.Item>
              </ListGroup>
              
            </Card.Body>
            
          </Card>
        </Col>
          
      </Row>

      <Row className="equal-height-row">
        <h2 className="title">Recent Lost PETS</h2>

        {approvedLostList.map((lost,index)=>{
          if(index<3){
            return(
              <Col md={3}>
                <Card  className="Card-animation" onClick={()=>{handleCardClick("lost",lost.ad_id)}}>
                  <Card.Img variant="top" src={lost.image} className="card-img" />
                  <Card.Body>
                  <div className="deneme">
                    <Card.Title>{lost.name}</Card.Title>
                    <Card.Title>{lost.city}</Card.Title>
                  </div>
                  </Card.Body>
                  
                </Card>
              </Col>
            )
          }
        })}
        <Col md={3}>
          <Card  className="SpecialCard-animation" onClick={()=>{handleLostSearch()}} >
            <div style={{display:"flex",justifyContent:"center"}}>
            <Card.Img variant="top" src={logo4} style={{maxHeight:"250px",maxWidth:"250px"}}/>
            </div>
            <Card.Body>
              <Card.Text>Many pets losted.</Card.Text>
              <ListGroup>
                <ListGroup.Item>Find Them</ListGroup.Item>
              </ListGroup>  
            </Card.Body>
            
          </Card>
        </Col>
          
      </Row>
    </Container>
  );
}
export default Home2;
