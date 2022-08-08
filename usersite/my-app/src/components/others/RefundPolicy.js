import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Form,Button} from 'react-bootstrap';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RefundPolicy extends Component {

    constructor(){

        super();
        this.state={
            refund:"",
            isLoading:'',
            mainDiv:"d-none"
        }
    }

        componentDidMount(){

            let siteInfoRefund=sessionStorage.getItem('siteInfoRefund');
    
            if(siteInfoRefund==null){
                axios.get(ApiUrl.sendSiteInfo).then(response=>{
           
                    if(response.status==200){
                        let jsonData=(response.data)[0]['terms'];
                        sessionStorage.setItem("siteInfoRefund",jsonData);
                        this.setState({refund:jsonData,isLoading:'d-none',mainDiv:''});
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
    
            this.setState({refund:siteInfoRefund,isLoading:'d-none',mainDiv:''});
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

                            
             
                                            <Card.Title className="text-center text-danger">Refund Policy</Card.Title>
                                        
                                            {parse(this.state.refund)}
                                           
                                        
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

export default RefundPolicy;