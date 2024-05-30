import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import "./editpage.css"
import { redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import {Card,Col,Button} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';

import axios from "axios";
function EditPage(props) {
  const navigate = useNavigate();
  const {ad_type, ad_id } = useParams();
  const [rowData,setRowData]=useState();
  const [neighborhoods,setNeighborhoods]=useState([]);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    address: '',
    city: '',
    neighborhood: '',
    description: '',
    image: ''
  });
  const token=props.token;

  useEffect(()=>{
    console.log("ad_id",ad_id);
    console.log("ad_type:",ad_type);
    if(ad_type=="adoption"){
      axios.post(`http://localhost:${props.port}/postAdoptionListByAdId`, {adid: ad_id},).then((response) => {
          console.log(response.data[0]);
          setRowData(response.data[0]);
          setFormData({
            
            name: response.data[0].name,
            breed: response.data[0].breed,
            age: response.data[0].age,
            gender: response.data[0].gender,
            address: response.data[0].address,
            city: response.data[0].city,
            neighborhood: response.data[0].neighborhood,
            description: response.data[0].description,
            image: response.data[0].image

          })
        
          
          
          }
      ).catch((error) => {
          console.log(error);
          //alert("Invalid email or password");
      })
    }
    else{
      axios.post(`http://localhost:${props.port}/postLostListByAdId`, {adid: ad_id},).then((response) => {
          console.log("ROWDATA",response.data[0]);
          setRowData(response.data[0]);
          setFormData({
            name: response.data[0].name,
            breed: response.data[0].breed,
            age: response.data[0].age,
            gender: response.data[0].gender,
            address: response.data[0].address,
            city: response.data[0].city,
            neighborhood: response.data[0].neighborhood,
            description: response.data[0].description,
            image: response.data[0].image


          })
        
          }
      ).catch((error) => {
          console.log(error);
          //alert("Invalid email or password");
      })

    }
    
  },[ad_id])

  useEffect(()=>{
    if(rowData!=undefined){
      handleCity(rowData.city);
      document.getElementById("neighborhood").innerHTML=rowData.neighborhood;
    }
  },[rowData])


  function correctData(){
    for (const key in formData) {
      if (formData[key] === "") {
        alert("Please fill all the fields");
        return false;
      }
    }
    return true;
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if( correctData()){
      if(ad_type=="adoption" ){
        axios.post(`http://localhost:${props.port}/updateAdoption`, {
          ad_id: ad_id,
          adoption_id: rowData.adoption_id,
          address: formData.address,
          age: formData.age,
          breed: formData.breed,
          city: formData.city,
          neighborhood: formData.neighborhood,
          description: formData.description,
          image: formData.image,
          name: formData.name,
          type: rowData.type,
          senderID: rowData.senderID,
        },{
          headers: {
            'Authorization': `${token}`
          }
        }).then((response) => {
          console.log(response.data);
          //redirect("/view/adoption/"+ad_id);
          navigate(`/view/adoption/${ad_id}`);
          })
          .catch((error) => {
            console.log(error);
            //alert("Invalid email or password");
          })
      }
      else{
        axios.post(`http://localhost:${props.port}/updateLost`, {
          ad_id: ad_id,
          lost_id: rowData.lost_id,
          address: formData.address,
          age: formData.age,
          breed: formData.breed,
          city: formData.city,
          neighborhood: formData.neighborhood,
          description: formData.description,
          image: formData.image,
          name: formData.name,
          type: rowData.type,
          senderID: rowData.senderID,
        },{
          headers: {
            'Authorization': `${token}`
          }
        }).then((response) => {
          console.log(response.data);
          //redirect("/view/lost/"+ad_id);
          navigate(`/view/lost/${ad_id}`);
          })
          .catch((error) => {
            console.log(error);
            //alert("Invalid email or password");
          })
      
      }
    } 
   
    
  }
  const handleChange= (event)=> {
     const { name, value } = event.target;
    
      setFormData((prevdata)=>({
        
        ...prevdata,
        [name]:value
        
      }))
      console.log("formdata:",formData);
      
    }
 
    function handleCity(city){
      console.log("city",city)
      setFormData({
        ...formData,
        city:city
      })
      document.getElementById("city").innerHTML=city;
      axios.post(`http://localhost:${props.port}/postDistricts`, {city:city},{
        headers: {
          'Authorization': `${token}`
        }
      }).then(response => {
        console.log(response.data.Distrcits);
        setNeighborhoods(response.data.Distrcits);
      }).catch(error => {
        console.error(error);
      })
   
    }
  
    function handleNeighborhood(neighborhood){
      console.log("neighborhood",neighborhood)
      setFormData({
        ...formData,
        neighborhood:neighborhood
      })
      document.getElementById("neighborhood").innerHTML=neighborhood;
    }
  

  
  return (
    <section >
      <Container fluid className="edit-content" >
        <Card className="shadow-sm" style={{textAlign:"center",placeItems:"center"}}>
          <h5 className="mb-3">{ad_type.charAt(0).toUpperCase()}{ad_type.substring(1)} Details</h5>
          <Col xs={6} md={4}>
            <Image src={formData.image} rounded width={"300px"} height={"300px"}/>
          </Col>
          <Card.Body style={{width:"50%"}}>
              <form onSubmit={handleSubmit}>
                <InputGroup size="md" className="mb-1">
                    <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
                    <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
                </InputGroup>
                <InputGroup size="md" className="mb-1">
                    <InputGroup.Text id="inputGroup-sizing-sm">Breed</InputGroup.Text>
                    <Form.Control
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
                </InputGroup>
                <InputGroup size="md" className="mb-1">
                    <InputGroup.Text id="inputGroup-sizing-sm">Age</InputGroup.Text>
                    <Form.Control
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
                </InputGroup>
                <InputGroup size="md" className="mb-1">
                    <InputGroup.Text id="inputGroup-sizing-sm">Gender</InputGroup.Text>
                    <Form.Control
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
                </InputGroup>
                <InputGroup size="md" className="mb-1">
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
                <InputGroup size="md" className="mb-1">
                    <InputGroup.Text id="inputGroup-sizing-sm">City</InputGroup.Text>
                    <DropdownButton id="city"  >
                      <Dropdown.Item onClick={()=>{handleCity("İstanbul")}}>İstanbul</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{handleCity("Ankara")}}>Ankara</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{handleCity("Antalya")}}>Antalya</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
                <InputGroup size="md" className="mb-1">
                    <InputGroup.Text id="inputGroup-sizing-sm">Neighborhood</InputGroup.Text>
                    <DropdownButton id="neighborhood"  scrollable>
                    {neighborhoods.map((neighborhood, index) => (
                      <Dropdown.Item key={index} onClick={()=>{handleNeighborhood(neighborhood)}}>{neighborhood}</Dropdown.Item>
                    ))}
                    </DropdownButton>
                </InputGroup>
                <InputGroup size="md" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Description</InputGroup.Text>
                  <Form.Control 
                  as="textarea" 
                  rows={10} 
                  type="text" 
                  name="description" 
                  value={formData.description}
                  onChange={handleChange}
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
              
                    <Button type="submit" variant="primary">Update Information</Button>
              
              </form>
            </Card.Body>
        </Card>

        


      </Container>

   
    </section>
    
  );
}

export default EditPage;


/*
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
                  <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">City</InputGroup.Text>
                      <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                  />
                  </InputGroup>

                  <div className="text-center">
                      <Button variant="primary">Update Information</Button>
                  </div>

*/