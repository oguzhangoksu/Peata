import { Container, Col, Card,Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from "react";
import axios from "axios";
import { ReactComponent as AISVG } from "../../Assets/artificial-intelligence-ai-icon.svg";
import "./newLost.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function NewLost(props) {
  const [showBubble, setShowBubble] = useState(false);
  const [imageURL,setImageURL]=useState("");
  const [neighborhoods,setNeighborhoods]=useState([]);
  const token=props.token;


 

  const [formData,setFormData] = useState({

    userid:props.user.uid,
    name:"",
    breed:"",
    age:"",
    gender:"",
    type:"",
    address:"",
    city:"",
    neighborhood:"",
    description:"",
    image:"",
    status:0


  });





  const handleMouseEnter = () => {
    console.log("mouse enter")
    setShowBubble(true);
    console.log("burası",formData.image)
  };

  const handleMouseLeave = () => {
    console.log("mouse leave")
    setShowBubble(false);
  };

  const handleChange= (e)=>{
    const {name,value}=e.target
    setFormData({

      ...formData,
      [name]:value
    })
    console.log("değişti:",formData)
  } 

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("submit")
    console.log("formdata",formData)
    if(correctData()){
      axios.post(`http://localhost:${props.port}/saveLost`, formData, {
        headers: {
          'Authorization': `${token}`
        }
      }).then(response => {
        console.log(response.data);
        if(response.data.error){
          alert("Please fill all the fields");
          return;
        }
        alert("Lost add is saved successfully");
      }).catch(error => {
        console.error(error);
      });   
    }
    else{
      console.log("error in data")
      alert("Please fill all the fields");
      return;
    }
   
   
  }
  function correctData(){
    for (const key in formData) {
      if (formData[key] === "") {
        alert("Please fill all the fields");
        return false;
      }
    }
    return true;
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formDataFile = new FormData();
    if (!file) {
      return;
    }
    formDataFile.append("image", file,file.name);
    axios.post(`http://localhost:${props.port}/upload`, formDataFile, {
      headers: {
        'userid': `${props.user.uid}`,
      }
    }).then(response => {
      console.log(response.data);
      setImageURL(response.data.imageUrl);
      setFormData({
        ...formData,
        image: response.data.imageUrl
      })
      console.log("formData:🚀🚀🚀🚀🚀",formData);
    }
    ).catch(error => {
      console.error(error);
    });
  };

  const handleClickAI = async() => {
    if (imageURL === "") {
      alert("Please upload an image first");
      return;
    }
    setFormData({
      ...formData,
      breed: "Predicting..."
    });
    // Post image data using Axios
    axios.post(`http://localhost:${props.port}/AIPredict`, {imageLink: imageURL}, {
      headers: {
        'Authorization': `${token}`
      }
    }
  ) .then(response => {
      console.log(response.data);//Prediction result
      let index = response.data.prediction.indexOf(":");
      const prediction = response.data.prediction.substring(0, index);
      const confidence = response.data.prediction.substring(index + 1, response.data.prediction.length);
      setFormData({
        ...formData,
        breed: prediction
      });
      document.getElementById("confidence").innerHTML = `Confidence:${parseFloat(confidence).toFixed(2)*100}%`;
      console.log("prediction",prediction);
      console.log("confidence:",parseFloat(confidence).toFixed(2)*100,"%");
    }).catch(error => {
      // Handle error
      console.error(error);
    });
  };

  function handleCity(city){
    console.log("city",city)
    setFormData({
      ...formData,
      city:city
    })
    document.getElementById("dropdown-basic-button").innerHTML=city;
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
    document.getElementById("Neighborhood").innerHTML=neighborhood;
  }

  return (
    <section >
      <Container fluid className="newAdoption-content">
      <Card className="shadow-sm" style={{textAlign:"center",placeItems:"center"}}>
          <h5 className="mb-3">NEW LOST ADD </h5>

          <Card.Body style={{width:"50%"}}>
             
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
              
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
                    <InputGroup.Text id="breed">Breed</InputGroup.Text>
                    <Form.Control
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    />
                  <AISVG className="AISVG" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={()=>{handleClickAI()}}></AISVG>
          
                  {showBubble && (
                    <div className="bubble">
                      You can detect your animal's breed(Abyssinian,Samoyed,Bengal,Scottish Deerhound,Birman,EntleBucher,Tuxedu)
                    </div>
                  )}
                  <div id="confidence" style={{marginLeft:"5px"}}> </div>
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
                    <InputGroup.Text id="inputGroup-sizing-sm">Type</InputGroup.Text>
                    <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
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
                    <DropdownButton id="dropdown-basic-button" title="Select City" >
                      <Dropdown.Item onClick={()=>{handleCity("İstanbul")}}>İstanbul</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{handleCity("Ankara")}}>Ankara</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{handleCity("Antalya")}}>Antalya</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
                <InputGroup size="md" className="mb-1">
                    <InputGroup.Text id="inputGroup-sizing-sm">Neighborhood</InputGroup.Text>
                    <DropdownButton id="Neighborhood" title="Select Neighborhood" scrollable>
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
              
                    <Button type="submit" variant="primary">Save New Lost Add</Button>
              
              </form>
            </Card.Body>
        </Card>
        


        


      </Container>

   
    </section>
    
  );
}

export default NewLost;