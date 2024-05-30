import React from "react";
import { Container, Row, Col, Card,Button } from "react-bootstrap";
import { useState ,useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import {useNavigate}  from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import "./profile.css"


function Profile(props) {
  let token=props.token;
  const[route, setRoute] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    user_name: "",
    phone: "",
    address:"",
    city:"",
    email:"",
    password: ""

  });
  const[adoptionAdds,setAdoptionAdds]=useState([]);
  const[lostAdds,setLostAdds]=useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  
  const navigate = useNavigate();
 
 
  useEffect(() => {
    if(route){
      navigate(route);
    }
  }, [route]);

  useEffect(() => {
    token=props.token;
    console.log("User😊😊😊😊😊😊😊:",props.user);
    console.log("Token🥳🥳🥳🥳🥳🥳🥳:",token);
    if(token === ""){
      navigate("/login");
      console.log("Token:",token);
      return;
    }
    else{
      console.log("Token:",token);
      console.log("User:",props.user);
      
      axios.post(`http://localhost:${props.port}/postUserById`,{userid:props.user.uid}, {
        headers: {
          'Authorization': `${token}`
        }
      }).then((response) => {
          console.log("User Information:",response.data);
          setFormData({
            user_id: response.data.user_id,
            name: response.data.name,
            surname: response.data.surname,
            user_name: response.data.user_name,
            phone: response.data.phone,
            address: response.data.address,
            city: response.data.city,
            email: response.data.email,
            password: response.data.password
          });
          document.getElementById("city").innerHTML=response.data.city;
          }
      ).catch((error) => {
          console.log(error);
      
      })
      //getAdoptionAdds
      axios.post(`http://localhost:${props.port}/postAdoptionListByUserId`,{userid:props.user.uid}, {
        headers: {
          'Authorization': `${token}`
        }
      }).then((response) => {
          console.log("Adoption List:",response.data);
          setAdoptionAdds(response.data);
          }
      ).catch((error) => {
          console.log(error);
      })
      
      axios.post(`http://localhost:${props.port}/postLostListByUserId`,{userid:props.user.uid}, {
        headers: {
          'Authorization': `${token}`
        }
      }).then((response) => {
          console.log("Lost List:",response.data);
          setLostAdds(response.data);
          }
      ).catch((error) => {
          console.log(error);
      })

    }
  }, [token]);
  
 

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      console.log("formData:",formData)
    };
  
  function handleCity(city){
    setFormData((prevData) => ({
      ...prevData,
      city: city,
    }));
  
    document.getElementById("city").innerHTML=city;
  }

    

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("submit çalıştı")
      try {
        // Send the form data to the backend API endpoint
        const response = await axios.post(`http://localhost:${props.port}/updateUser`, formData,{
          headers: {
            'Authorization': `${token}`
          }
        });
        console.log("Response:", response.data);
        // Handle successful response
        setIsUpdated(true);
        setTimeout(() => {
          setIsUpdated(false);
        }, 4500);
        
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };


  const handleEdit = (ad_type,ad_id) => {
    // Redirect to the edit page for the specified ID
    navigate(`/edit/${ad_type}/${ad_id}`);
  };

  function handleAdType(adoption_id){
    if(adoption_id=="" || adoption_id==null || adoption_id==undefined){
      return "lost";
    }
    else{
      return "adoption";
    }
  }
  function handleDelete(ad_type,ad_id,adoption_id,lost_id){
    if(ad_type==="adoption"){
      axios.post(`http://localhost:${props.port}/deleteAdoption`,{ad_id:ad_id,adoption_id:adoption_id},{
        headers: {
          'Authorization': `${token}`
        }
      }).then((response) => {
          console.log("Delete Response:",response.data);
          setAdoptionAdds(adoptionAdds.filter(add => add.ad_id !== ad_id));
      
          })
      .catch((error) => {
          console.log(error);
      })
    }
    else{
      axios.post(`http://localhost:${props.port}/deleteLost`,{ad_id:ad_id,lost_id:lost_id},{
        headers: {
          'Authorization': `${token}`
        }
      }).then((response) => {
          console.log("Delete Response:",response.data);
          setLostAdds(lostAdds.filter(add => add.ad_id !== ad_id));
          })
      .catch((error) => {
          console.log(error);
      })
      
    }
  }
  
  function handleCards(information,status){
    return (
      <Card className="mb-3" style={{textAlign:"center", width:"20rem"}}>
        <Card.Img height={"250 rem"} variant="top" src={information.image} />
        <Card.Body>
          <Card.Title>Name : {information.name}</Card.Title>
          <Card.Title>Breed - {information.breed}</Card.Title>
          <Card.Text>
            {information.description.substring(0, 100)}...
          </Card.Text>
          <div style={{display:"flex", justifyContent:"center"}}>
          <div className="button-style" style={{width:"100px"}} onClick={()=>{handleEdit(handleAdType(information.adoption_id),information.ad_id)}}>Edit</div>
          <div className="button-style2" style={{width:"100px",marginLeft:"20px"}} onClick={()=>{handleDelete(handleAdType(information.adoption_id),information.ad_id,information.adoption_id,information.lost_id)}}>Delete</div>
          </div>      
          <p className="text-muted mt-2">Status: {status}</p>
        </Card.Body>
      </Card>
    )
  }












  return (
    <Container fluid className="profile-content">
      <Row>
        <Col md={4}>
          <Card className="card-style">
            <Card.Body>
                <div className="text-center">
                    
                    <h4 className="mb-0">{formData.name} {formData.surname}</h4>
                    <p className="text-muted">{formData.email}</p>
                </div>
                <hr />
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="text-center">
                        <div  className="button-style" onClick={()=>{setRoute("/newAdoption")}}>New Adoption</div>
                    </div>
                    <div className="text-center" style={{marginLeft:"10px"}}>
                        <div className="button-style" style={{minWidth:"128px"}} onClick={()=>{setRoute("/newLost")}}>New Lost</div>
                    </div>
                </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="card-style">
            <Card.Body>
                <h5 className="mb-3">Profile Details</h5>
                <Form onSubmit={handleSubmit} id="form">
                
                  <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm" >Name</InputGroup.Text>
                      <Form.Control 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                  />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">Surname</InputGroup.Text>
                      <Form.Control
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                  />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">User Name</InputGroup.Text>
                      <Form.Control
                      type="text"
                      name="username"
                      value={formData.user_name}
                      onChange={handleChange}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                  />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">Phone</InputGroup.Text>
                      <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                  />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">Address</InputGroup.Text>
                      <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                  />
                  </InputGroup>
                  <InputGroup size="md" className="mb-1"  >
                    <DropdownButton id="city" title="Select City" className="custom-dropdown-menu" >
                        <Dropdown.Item onClick={()=>{handleCity("İstanbul")}}>İstanbul</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleCity("Ankara")}}>Ankara</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleCity("Antalya")}}>Antalya</Dropdown.Item>
                    </DropdownButton>
                  </InputGroup>

                  <div className="text-center">
                      <button className="button-style" variant="primary" type="submit">Update Information</button>
                  </div>
                </Form>
                {isUpdated && 
                  (<div className="alert-update">
                    Information Updated Successfully
                  </div>)}
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
            <Card className="card-style">
                <Card.Body style={{textAlign:"center"}}>
                    <h5 className="mb-3">Recent Adoption Adds</h5>
                    <Row >
                      {adoptionAdds.map((adoptionAdd) => (
                        <Col md={4} key={adoptionAdd.ad_id}>
                          {adoptionAdd.status ===0 &&(
                            handleCards(adoptionAdd,"Pending")
                          
                          )}
                          {adoptionAdd.status ===1 &&(
                            handleCards(adoptionAdd,"Rejected")
                          )}
                          {adoptionAdd.status ===2 &&(
                            handleCards(adoptionAdd,"Approved")
                          )}
                        </Col>
                      ))}
                    </Row>
                      
                    
                </Card.Body>

            </Card>
        </Col>
        <Col md={12}>
            <Card className="card-style">
                <Card.Body style={{textAlign:"center"}}>
                    <h5 className="mb-3">Recent Lost Adds</h5>
                    <Row >
                      {lostAdds.map((lostAdd) => (
                        <Col md={4} key={lostAdd.ad_id} style={{margin:"0px 5px 0px 5px"}}>
                          {lostAdd.status ===0 &&(
                          handleCards(lostAdd,"Pending")
                          )}
                          {lostAdd.status ===1 &&(
                          handleCards(lostAdd,"Rejected")
                          )}
                          {lostAdd.status ===2 &&(
                          handleCards(lostAdd,"Approved")
                          )}
                        </Col>
                      ))}
                    </Row>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;