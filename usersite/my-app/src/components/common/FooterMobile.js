import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';
import {Link} from "react-router-dom"
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FooterMobile extends Component {

        
    constructor(){

        super();
        this.state={
            facebook_link:"",
            twitter_link:"",
            instagram_link:"",
            address:"",
            delivery_notie:"",
            isLoading:'',
            mainDiv:"d-none mt-5"
        }
    }

    componentDidMount(){

        let siteInfoFooter=sessionStorage.getItem('siteInfoFooter');

        if(siteInfoFooter==null){
            axios.get(ApiUrl.sendSiteInfo).then(response=>{
       
                if(response.status==200){
                    let jsonData=(response.data)[0];

               
                    sessionStorage.setItem("siteInfoFooter",JSON.stringify(jsonData));
                    this.setState({
                        
                        
                        facebook_link:jsonData['facebook_link'],
                        twitter_link:jsonData['twitter_link'],
                        instagram_link:jsonData['instagram_link'],
                        address:jsonData['address'],
                        delivery_notie:jsonData['delivery_notice'],
                        
                        isLoading:'d-none',mainDiv:''});
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

            let FooterDatajson=JSON.parse(siteInfoFooter);

        this.setState({
            
            facebook_link:FooterDatajson['facebook_link'],
            twitter_link:FooterDatajson['twitter_link'],
            instagram_link:FooterDatajson['instagram_link'],
            address:FooterDatajson['address'],
            delivery_notie:FooterDatajson['delivery_notice'],
            
            
            isLoading:'d-none',mainDiv:''});
        }

    
    }
    render() {
        return (
            <Fragment>

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


                <div className={this.state.mainDiv}>
               <Container fluid={true} className="mt-2">

               <Row className="px-0 my-0 mt-1 footer-section">

                <Col className="p-2" sm={6} xs={12}>

                             
                     <h5 className="footer-menu-title mt-3">OFFICE ADDRESS</h5>
                     <p>  {parse(this.state.address)}</p>
                </Col>
                
                <Col className="p-2"  sm={6} xs={12}>
                <h5 className="footer-menu-title mt-3">SOCIAL LINK</h5>
                <a target="_blank" href={this.state.facebook_link}><i className="fab m-1 h4 fa-facebook"/></a>
                <a target="_blank" href={this.state.instagram_link}><i className="fab m-1 h4 fa-instagram"/></a>
                <a target="_blank" href={this.state.twitter_link}><i className="fab m-1 h4 fa-twitter"/></a>

             
                                  
                </Col>
                <Col className="p-2"  sm={6} xs={12}>
                <h5 className="footer-menu-title mt-3">MORE</h5>
                <Link to="/about"  className="footer-link">About Us</Link><br/>
                <Link to="/contact" className="footer-link">Contact Us</Link><br/>
                <Link to="/purchase" className="footer-link">How To Purchase</Link><br/>
                  <Link to="/policy" className="footer-link">Privacy Policy</Link><br/>
                 <Link to="/refund" className="footer-link">Refund Policy</Link><br/>

             
                                  
                </Col>
                
                
                
                
            
                </Row>
               </Container>
               <Container fluid={true} className=" m-0 pt-3 pb-1 bg-dark">
                            <Container className="">
                                <Row className="px-0 text-white">
                                <p>{parse(this.state.delivery_notie)}</p>
                                </Row>
                            </Container>
                        </Container>

            </div>
            </Fragment>
        );
    }
}

export default FooterMobile;