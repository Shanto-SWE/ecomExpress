import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Form,Button} from 'react-bootstrap';
import validation from '../../validation/validation';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Contact extends Component {


    constructor(){

        super();
        this.state={

            name:"",
            mobile:"",
            message:""
        }

    }

    onChangeName=(event)=>{

        let name=event.target.value;
        this.setState({name:name});
    


    }
       onChangeMobile=(event)=>{

        let mobile=event.target.value;
        this.setState({mobile:mobile});


    }

    onChangeMessage=(event)=>{

        let message=event.target.value;
        this.setState({message:message});

    }


    onFormSubmit=(event)=>{
  

     let name=this.state.name;
     let mobile=this.state.mobile;
     let message=this.state.message;
     let contactForm=document.getElementById('contactForm');
     let sendBtn=document.getElementById('sendBtn');
  

     if(name.length==0){
 
        toast.error('Name is required',{
            theme: "colored"
        });
     }else if(mobile.length==0){
        toast.error('Mobile number is required',{

            theme: "colored"
        });

     }else if(message.length==0){
        toast.error('Message  is requird',{
            theme: "colored"
        });
     }else if(!(validation.NameRegx).test(name)){
        toast.error('Valid name is requird',{
            theme: "colored"
        });

     }else if(!(validation.MobileRegx).test(mobile)){
        toast.error('Valid mobile is requird',{
            theme: "colored"
        });
     }else{
       
                let formData=new FormData();
                formData.append("name", name);
                formData.append("mobile", mobile);
                formData.append("message", message);
                sendBtn.innerHTML="sending...";

                axios.post(ApiUrl.sendContactDetails,formData).then(function(response){

                    if(response.status==200 && response.data==1){
                        toast.success('Request Seccess',{
                            theme: "colored",
                     
                        });
                        sendBtn.innerHTML="send";
                        contactForm.reset();
                    }else{
                        toast.error('Request fall! try again',{
                            theme: "colored"
                        });
                    }
                }).catch(function(error){

                    toast.error('Request fall! try again',{
                        theme: "colored"
                    });
                    contactForm.reset();

                });


     }

     event.preventDefault();



    }


    render() {
        return (
            <Fragment>

            <Container className="TopSection mt-5 mb-5 contactpage">

                <Row className="d-flex justify-content-center mt-5 ">
                    <Col md={8} lg={8} sm={12} xm={12} className="BetweenTwoSection mt-5">

                        <Card className="card mt-5 p-5" >
                            <Card.Body>

                            
                            <Row>
                                            <Col md={6} lg={6} sm={12} xm={12}>
                                            <Card.Title className="text-center text-danger">Contact With Us</Card.Title>
                                            <p className="text-center">If you have any query,just contact </p>
                                    <Form id="contactForm" onSubmit={this.onFormSubmit}>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                 
                                        <Form.Control onChange={this.onChangeName} className="mt-1" type="text" placeholder="Your name" />

                                   
                                        <Form.Control onChange={this.onChangeMobile} className="mt-1" type="number" placeholder="Your phone" />
                                        <Form.Control onChange={this.onChangeMessage} className="mt-1" type="text" placeholder="Your Message" />
                                        </Form.Group>

                         


                                    <Button type="submit" className="mt-4 btn btn-danger btn-block loginbtn" id="sendBtn">
                                        Send
                                    </Button>
                                    </Form>

                                            </Col>

                                            <Col md={6} lg={6} sm={12} xm={12} className="">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14588.854375114537!2d90.2093536296416!3d23.917489452114673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ef3b41817743%3A0x5cf32dfdfc4ae51e!2sDhamrai%20Bazar!5e0!3m2!1sen!2sbd!4v1654447818522!5m2!1sen!2sbd" width="400" height="400"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                            </Col>
                                        </Row>

                                        
                            </Card.Body>
                        </Card>
                    </Col>

                    
                </Row>
                <ToastContainer />
            </Container>
                
            </Fragment>
        );
    }
}

export default Contact;