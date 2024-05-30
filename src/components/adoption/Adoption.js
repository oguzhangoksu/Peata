import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./adoption.css"
import CustomDropdown from "../CustomDropdown.js";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";

function Adoption(props) {
  const [type,settype]=useState('');
  const [city,setcity]=useState('');
  const [age,setage]=useState('');
  const [approvedAdoptionList,setApprovedAdoptionList]=useState([]);
  const handleType=(type)=>{
    settype(type === "All" ? "" : type);
    console.log("Type:😊😊😊😊😊", type);
  }
  const handleCity=(city)=>{
    setcity(city === "All" ? "" : city);
    console.log("City:😊😊😊😊😊", city);
  }
  const handleAge=(age)=>{
    
    setage(age === "All" ? "" : age);
    console.log("Age:😊😊😊😊😊", age);
  }

  const typearray = ["Cat","Dog","All"];
  const cityarray = ["Antalya","Ankara","İstanbul","All"];
  const agearray = ["1-3","4-6","7-9",,"All"];
  const filteredAdoptions = approvedAdoptionList.filter(adoption => {
    if (type && adoption.type !== type) return false;
    if (city && adoption.city !== city) return false;
    if (age && (parseInt(adoption.age) < parseInt(age.substring(0,1)) || parseInt(adoption.age) > parseInt(age.substring(2,3)))) return false;
    return true;
  });

  useEffect(() => {
    axios.get(`http://localhost:${props.port}/getApprovedAdoptionList`)
    .then((response) => {
      console.log(response.data);
      setApprovedAdoptionList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  function handleCardClick(ad_type,ad_id){
    window.location.href=`#view/${ad_type}/${ad_id}`;
  }



  return (
    <Container fluid className="Adoption-content">
      <div style={{display:"flex"}}>
      <Col md="3" style={{height:"100%"}}>
          <Card style={{backgroundColor:"#eff7ea"}}>
            <div style={{padding:"20px"}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"20px"}}>
                <h6>Type:</h6>
              <CustomDropdown array={typearray} name={"Select Type"} handleType={handleType}/>
              </div>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"20px"}}>
                <h6>City:</h6>
                <CustomDropdown array={cityarray} name={"Select City"} handleCity={handleCity}/>
              </div>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"20px"}}>
                <h6>Age:</h6>
                <CustomDropdown array={agearray} name={"Select Age"} handleAge={handleAge}/>
              </div>
            </div>
          </Card>
        </Col> 
        <Container fluid >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
       
          {filteredAdoptions.map((adoption, index) => {
            
              return (
                
                <Col md="4">
                  <Card key={index} className="Card-animation" onClick={()=>{handleCardClick("adoption",adoption.ad_id)}}>
                    <Card.Body>
                      <Card.Img variant="top" src={adoption.image} className="Card-image"/>
                      <Card.Title>{adoption.name}</Card.Title>
                      <Card.Text>
                        <p>Breed:{adoption.breed}</p>
                        <p>City: {adoption.city}</p>
                        <p>Age: {adoption.age}</p>
                        
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                
              );
              
            
            
          })}
        </div>
      </Container>
      </div>
    </Container>
  );
}

export default Adoption;