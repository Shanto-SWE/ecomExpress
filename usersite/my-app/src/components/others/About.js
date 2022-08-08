import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Form,Button,Breadcrumb} from 'react-bootstrap';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";


class About extends Component {

    constructor(){

        super();
        this.state={
            about:"",
            isLoading:'',
            mainDiv:"d-none"
        }
    }

    componentDidMount(){

        let siteInfoAbout=sessionStorage.getItem('siteInfoAbout');

        if(siteInfoAbout==null){
            axios.get(ApiUrl.sendSiteInfo).then(response=>{
       
                if(response.status==200){
                    let jsonData=(response.data)[0]['about'];
                    sessionStorage.setItem("siteInfoAbout",jsonData);
                    this.setState({about:jsonData,isLoading:'d-none',mainDiv:''});
                   }else{
   
                       toast.error('Something went wrong! try again',{
   
                           theme: "colored",
                           position:"bottom-center"
                       });
                   }
               
             }).catch(error=>{
                toast.error('Something went wrong! try again',{

                    theme: "colored",
                    position:"bottom-center"
                });
     
             })
        }else{

        this.setState({about:siteInfoAbout,isLoading:'d-none',mainDiv:''});
        }

    
    }
    
    render() {
        return (
            <Fragment>

            <Container className="TopSection mt-5  contactpage">
           
          
                <Row className="d-flex justify-content-center mt-5 ">
                <Breadcrumb className="shadow-sm mt-5 bg-white">
                        <Breadcrumb.Item> <Link to="/">Home</Link>    </Breadcrumb.Item>
                        <Breadcrumb.Item> <Link to="/about">About</Link>    </Breadcrumb.Item>
                    </Breadcrumb>
            <ToastContainer />
                    <Col md={10} lg={10} sm={12} xm={12} className="BetweenTwoSection mt-5">
            

                    <Card className={this.state.isLoading}>
                    <div class="ph-item">
                            <Card.Body>
                    
                       
                            
                             <div class="ph-row">
                        
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                           </div>
                           
                           <div class="ph-row">
                        
                        <div class="ph-col-12"></div>
                        <div class="ph-col-12"></div>
                        <div class="ph-col-12"></div>
                        <div class="ph-col-12"></div>
                        <div class="ph-col-12"></div>
                        <div class="ph-col-12"></div>
                       </div>

                   

                                        
                            </Card.Body>
                            </div>    
                        </Card>
            
                    <Card className={this.state.mainDiv} >
                            <Card.Body>

                            
             
                                            <Card.Title className="text-center text-danger">About Us</Card.Title>
                                        
                                            {parse(this.state.about)}
                                           
                                        
                            </Card.Body>
                        </Card>
                    </Col>

                    
                </Row>
            </Container>
          
            </Fragment>
        );
    }
}

export default About;