import Container from "react-bootstrap/esm/Container";
import Image from 'react-bootstrap/Image';
import { useParams } from "react-router-dom";
import axios from "axios";
import "./view.css"
import { useEffect,useState } from "react";
import { Card } from "react-bootstrap";

function View(props) {
    const token=props.token;
    const {ad_type, ad_id } = useParams();
    const [rowData,setRowData]=useState([]);
    const [user,setUser]=useState('');
    useEffect(()=>{
        if(ad_type=="adoption"){
            axios.post(`http://localhost:${props.port}/postAdoptionListByAdId`,{adid:ad_id},)
            .then((response)=>{
                console.log(response.data[0]);
                setRowData(response.data[0]);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        else{
            axios.post(`http://localhost:${props.port}/postLostListByAdId`,{adid:ad_id},)
            .then((response)=>{
                console.log(response.data[0]);
                setRowData(response.data[0])
                
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    },[ad_id])
    
    useEffect(()=>{
        console.log("burası😊",rowData.senderID);
            axios.post(`http://localhost:${props.port}/postUserById`,{userid:rowData.senderID})
            .then((response)=>{
                console.log("ROWDATA",response.data);
                setUser(response.data);
            }).catch((error)=>{
                console.log(error);
            })
    },[rowData])

  
    return (
        <section >
        <Container fluid className="view-content" >
            <div className="imageContainer">
                <Image src={rowData.image} fluid style={{  height: '100%' }} />
            </div>
            <Card>
                <Card.Body>
                    <Card.Title>{rowData.name}</Card.Title>
                    <Card.Text>
                        {rowData.breed}-{rowData.age}-{rowData.gender}- {rowData.city}- {rowData.neighborhood}
                    </Card.Text>
     
                    
                    <h3>About</h3>
                    <Card.Text>
                        {rowData.description} 
                    </Card.Text>
                    <h3>Contact Information</h3>
                   
                    <Card.Text>
                        {user.name} {user.surname}
                    </Card.Text>
                    <Card.Text>
                        {user.phone}
                    </Card.Text>
                    <Card.Text>
                        {user.email}
                    </Card.Text>
                </Card.Body>
                
            </Card>

        </Container>

    
        </section>
        
    );
}

export default View;