import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
//import logo from "../../Assets/peata.png"
import logo2 from "../../Assets/Logo.jpeg"
import logo from "../../Assets/Logo2.png"

import Dropdown from 'react-bootstrap/Dropdown';
import { ThemeContext } from "../Context/theme";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./navbar.css";
import { Col, Row } from 'react-bootstrap';


function NavBar(props) {
    const token=props.token;

    const [mails, setMails] = useState([]);
    const [buttonText, setButtonText] = useState("");
    const [{ themename, toggeltheme }] = useContext(ThemeContext);
    
    function handleLogout(){
      props.handleLogin('','');
      localStorage.setItem('token','');
      localStorage.setItem('user','');
    }

    useEffect(()=>{
      if(token != ''||token != null||token != undefined){
        axios.post(`http://localhost:${props.port}/mailboxByUserId`,{userid:props.user.uid},{
          headers: {
            'Authorization': `${token}`
          }
        }).then((response)=>{
          const convertedData = response.data.map(item => {
            const date = new Date(item.date._seconds * 1000 + item.date._nanoseconds / 1000000);
            return { ...item, date };
          });
          //sort by date 
          const sortedData=convertedData.sort((a, b) => b.date - a.date);
          console.log("sorted data:",sortedData);            
          setMails(sortedData);

        }
        ).catch((error)=>{
          console.log(error);
        })

      }

    },[token,buttonText])

    useEffect(() => {
      const body = document.body;
      const toggle = document.querySelector(".toggle-inner");
      if (themename === "dark") {
        body.classList.add("dark-mode");
        toggle.classList.add("toggle-active");
      } else {
        body.classList.remove("dark-mode");
        toggle.classList.remove("toggle-active");
      }
    }, [themename]);

    function decideAdType(message){
      if(message=="There is someone around you who wants to find homes for stray animals!!!"){
        return "adoption";
      }
      else if(message=="There is someone around you who lost their pet!!!"){
        return "lost";
      }
    }
    function handleMessageClick(mail){
        console.log("💕💕💕💕💕",mail);
        const ad_type=decideAdType(mail.message);
        window.location.href=`#view/${ad_type}/${mail.ad_id}`;
        if(mail.read==false){
          axios.post(`http://localhost:${props.port}/changeReadByMailboxId`,{userid:props.user.uid,mailboxid:mail.mailbox_id},{
            headers: {
              'Authorization': `${token}`
            }
          }).then((response)=>{
            console.log(response.data);
         
          }).catch((error)=>{
            console.log(error);
          })
        }
      
    }

    return(
        <Navbar expand="lg" variant="dark" fixed='top'  >
        <Container >
          <Navbar.Brand as={Link} to ="/"><img src={logo} className='navbar-logo' width={100} height={100}  ></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav " style={{backgroundColor:"#3abb69"}} />
          <Navbar.Collapse id="basic-navbar-nav " >
            <Nav className="ms-auto ">
              <Nav.Link as={Link} to ="/"> 
                <div className="bottom-container" onClick={()=>{setButtonText("Home")}}>
                  <button className="animated-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16" >
                      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                      <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                    </svg>
                  Home
                  </button>
                </div></Nav.Link>
                <Nav.Link as={Link} to ="/adoption"> 
                <div className="bottom-container" onClick={()=>{setButtonText("Home")}}>
                  <button className="animated-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
                    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
                    <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
                  </svg>
                  Adoption
                  </button>
                </div></Nav.Link>
                <Nav.Link as={Link} to ="/lost"> 
                <div className="bottom-container" onClick={()=>{setButtonText("Home")}}>
                  <button className="animated-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
                    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
                    <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
                  </svg>
                  Lost
                  </button>
                </div></Nav.Link>
                <Nav.Link as={Link} to ="/about"> 
                <div className="bottom-container" onClick={()=>{setButtonText("About")}}>
                  <button className="animated-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                  </svg>
                  About Us
                  </button>
                </div></Nav.Link>

              {token != '' &&(
              <Nav.Link as={Link} to ="/profile" onClick={()=>{setButtonText("Profile")}}>
                <div className="bottom-container">
                  <button className="animated-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-person iconStyle" viewBox="0 0 16 16" >
                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5z"/>
                  </svg>
                    Profile</button>
                </div>
              </Nav.Link>)
              }
              {token != '' &&(
                 <Nav.Link >
                 <div className="bottom-container " onClick={()=>{setButtonText("Mailbox")}}>
                 <Dropdown >
                    <Dropdown.Toggle  id="messageBox" className='animated-button'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-envelope-fill iconStyle" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                      </svg>
                      Mailbox
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dowdown-menu'>
                      {mails.length&&(
                      mails.map((mail,index)=>{
                        if(mail.read==false){
                          return(
                            
                            <Row onClick={()=>{handleMessageClick(mail)}} className='messageBoxUnread' key={index}>
                                <Container>
                                <div style={{display:"flex", textAlign:"center"}}>
                                  <h6>{mail.message}</h6>
                                  
                                  <img src={mail.image} className='navbar-logo' width={100} height={100} style={{marginLeft:"50px"}}  ></img>
                                  
                                  </div>  
                                </Container>
                              </Row>
                          )
                        }
                        else if(mail.read==true){

                          return(
                              <Row onClick={()=>{handleMessageClick(mail)}} key={index} className='messageBox'>
                                <Container>
                                  <div style={{display:"flex", textAlign:"center"}}>
                                  <h6>{mail.message}</h6>
                                  
                                  <img src={mail.image} className='navbar-logo' width={100} height={100} style={{marginLeft:"50px"}}  ></img>
                                  
                                  </div>  
                                </Container>
                                
                              </Row>
                          )
                        }
                        else{
                          return(
                            <Row key={index} className='messageBoxNon'>
                              <Container>
                                <Col md="12">
                                <h6>{mail.message}!!!!🥳🥳🥳🥳🥳🥳</h6>
                                </Col>
  
                              </Container>
                            </Row>
                          )
                        }
                      }))}
                     
                  

                    </Dropdown.Menu>
                  </Dropdown>
                 </div>
                 
               </Nav.Link>
              )}
              {
                token != '' &&(
                  <Nav.Link as={Link} to ="/" >
                    <div className="bottom-container">
                      <button className="animated-button" onClick={()=>{handleLogout()}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-person iconStyle" viewBox="0 0 16 16">
                        <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5z"/>
                      </svg>
                        Logout</button>
                    </div>
                  </Nav.Link>)
              }
              {token == '' &&(
              <Nav.Link  >
                <div className="bottom-container">
                  <button className="animated-button" onClick={props.handleOpenLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-person iconStyle" viewBox="0 0 16 16">
                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5z"/>
                  </svg>
                    Login</button>
                </div>
              </Nav.Link>) 
              }

              
            </Nav>
            <Nav.Item>
            <div className="theme-switch">
              <div id="toggle" onClick={toggeltheme}>
                <div className="toggle-inner" />
              </div>
            </div>
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
}

export default NavBar;

