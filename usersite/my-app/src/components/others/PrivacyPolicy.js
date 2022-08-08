import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Form,Button} from 'react-bootstrap';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PrivacyPolicy extends Component {

    constructor(){

        super();
        this.state={
            policy:"",
            isLoading:'',
            mainDiv:"d-none"
        }
    }

        componentDidMount(){

            let siteInfoPolicy=sessionStorage.getItem('siteInfoPolicy');
    
            if(siteInfoPolicy==null){
                axios.get(ApiUrl.sendSiteInfo).then(response=>{
           
                    if(response.status==200){
                        let jsonData=(response.data)[0]['policy'];
                        sessionStorage.setItem("siteInfoPolicy",jsonData);
                        this.setState({policy:jsonData,isLoading:'d-none',mainDiv:''});
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
    
            this.setState({policy:siteInfoPolicy,isLoading:'d-none',mainDiv:''});
            }
    
        
        }
    render() {
        return (
            <Fragment>

            <Container className="TopSection mt-5  contactpage">

                <Row className="d-flex justify-content-center mt-5 ">
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

                            
             
                                            <Card.Title className="text-center text-danger">Privacy Policy</Card.Title>
                                        
                                            {parse(this.state.policy)}
                                           
                                        
                            </Card.Body>
                        </Card>
                    </Col>

                    
                </Row>
            </Container>
            <ToastContainer />
            </Fragment>
        );
    }
}

export default PrivacyPolicy;