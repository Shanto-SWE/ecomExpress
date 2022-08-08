import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';
import applestore from '../../assets/image/applestore.jpg';
import playstore from '../../assets/image/playstore.png';
import {Link} from 'react-router-dom'
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FooterDesktop extends Component {

    
    constructor(){

        super();
        this.state={
            company:"",
            facebook_link:"",
            twitter_link:"",
            instagram_link:"",
            address:"",
            ios_link:"",
            android_link :"",
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
                        
                        company:jsonData['about_company'],
                        facebook_link:jsonData['facebook_link'],
                        twitter_link:jsonData['twitter_link'],
                        instagram_link:jsonData['instagram_link'],
                        address:jsonData['address'],
                        ios_link:jsonData['ios_app_link'],
                        android_link :jsonData['android_app_link'],
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
            
            company:FooterDatajson['about_company'],
            facebook_link:FooterDatajson['facebook_link'],
            twitter_link:FooterDatajson['twitter_link'],
            instagram_link:FooterDatajson['instagram_link'],
            address:FooterDatajson['address'],
            ios_link:FooterDatajson['ios_app_link'],
            android_link :FooterDatajson['android_app_link'],
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
          
            <Container fluid={true} className="mt-5">

<Row className="px-0 my-0 mt-5 footer-section">

 <Col className="p-1" lg={4} md={4} sm={6} xs={12}>

 <h5 className="footer-menu-title">ABOUT COMPANY</h5>
                     <p>   {parse(this.state.company)}</p>
                     <h5 className="footer-menu-title">SOCIAL LINK</h5>
                     <a target="_blank" href={this.state.facebook_link}><i className="fab m-1 h4 fa-facebook"/></a>
                     <a target="_blank" href={this.state.instagram_link}><i className="fab m-1 h4 fa-instagram"/></a>
                     <a target="_blank" href={this.state.twitter_link}><i className="fab m-1 h4 fa-twitter"/></a>
 </Col>
 
 <Col className="p-1" lg={3} md={3} sm={6} xs={12}>

 <h5 className="footer-menu-title">THE COMPANY</h5>
                     <Link to="/about"  className="footer-link">About Us</Link><br/>
                     <Link to="/contact" className="footer-link">Contact Us</Link><br/>
                     
                     <h5 className="footer-menu-title mt-3">OFFICE ADDRESS</h5>
                     <p>  {parse(this.state.address)}</p>
 </Col>
 
 <Col className="p-1" lg={2} md={2} sm={6} xs={12}>

 <h5 className="footer-menu-title">MORE INFO</h5>
                     <Link to="/purchase" className="footer-link">How To Purchase</Link><br/>
                     <Link to="/policy" className="footer-link">Privacy Policy</Link><br/>
                     <Link to="/refund" className="footer-link">Refund Policy</Link><br/>
                     <h5 className="mt-3">Change Language</h5>
                     <p id="google_translate_element" className="google_trans"></p>
 </Col>
 
 <Col className="p-1" lg={3} md={3} sm={6} xs={12}>
 <h5 className="footer-menu-title px-3">DOWNLOAD APP</h5>
                     <a target="_blank" href={this.state.ios_link}><img className="footerapplestore img-fluid" src={applestore}  alt="ios logo"/></a><br/>
                     <a target="_blank" href={this.state.android_link}><img className="footerplaystore img-fluid" src={playstore} alt="android logo"/></a>
                     
     
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

export default FooterDesktop;