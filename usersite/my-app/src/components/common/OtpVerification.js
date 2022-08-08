import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Form,Button} from 'react-bootstrap';
import axios from "axios";
import ApiUrl from '../../api/ApiUrl';
import validation from '../../validation/validation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import image from '../../assets/image/otpverification.png';
import LocalStorageHelper from '../../LocalStorageHelper/LocalStorageHelper';
import { Navigate } from "react-router-dom";

class OtpVerification extends Component {

    constructor() {
        super();
        this.state={
            btn:"Login",
            OtpNo:"",
            UserRedirect:false,
            mobileNo:"",
        }
        this.OtpOnChange=this.OtpOnChange.bind(this);
        this.onNextClick=this.onNextClick.bind(this);
        this.onUserRedirect=this.onUserRedirect.bind(this);
    

    }

    OtpOnChange(event){
        let OtpValue=  event.target.value;
        this.setState({OtpNo:OtpValue})
      }

      onNextClick(){
        let OtpValue=  this.state.OtpNo;
        let mobileNo=  this.state.mobileNo;
        if(OtpValue.length!==6){
            toast.error('Invalid Verification Code',{
                theme: "colored",
                position:"bottom-center"
            });
        }
        else{
            let URL=ApiUrl.OtpVerification;
            let MyFormData=new FormData();
            MyFormData.append('OTP',OtpValue);
            MyFormData.append('mobileNo',mobileNo);

            axios.post(URL,MyFormData).then((response)=>{
                if( response.data===1){
                 
                    LocalStorageHelper.setUserMobile(mobileNo)
                    toast.success('Verification Success',{
                        theme: "colored",
                        position:"bottom-center"
                    });
                    this.setState({UserRedirect:true})
                  
                }
               else if(response.data===0){
                  
                    toast.error('Invalid Verification Code',{
                        theme: "colored",
                        position:"bottom-center"
                    });
                    
               }
               else{
                   

                    toast.error('Request Fail ! Try Again',{
                        theme: "colored",
                        position:"bottom-center"
                    });
                }

            }).catch((error)=>{
                toast.error('Request Fail ! Try Again',{
                    theme: "colored",
                    position:"bottom-center"
                });
            });

        }
    }

    onUserRedirect(){
        
        if(this.state.UserRedirect===true){


            let winPath=LocalStorageHelper.GetRedirectFromDetails()
            if(winPath===null){
                return(<Redirect to="/"/>)
            }
            else {
                return( <Navigate to={winPath} />)
            }
         
        }
    }

    componentDidMount() {
        window.scroll(0,0);
        let mobileNo= this.props.mobileNo;
        this.setState({mobileNo:mobileNo});

     }
    render() {
        return (
            <Fragment>

            <Container className="TopSection animated slideInDown">

                <Row className="d-flex justify-content-center mt-5 ">
                    <Col md={12} lg={10} sm={10} xm={12} className="shadow-sm bg-white mt-5">


                            
                            <Row>
                                            <Col classname="d-flex justify-content-center mt-5" md={6} lg={6} sm={12} xm={12}>
                                         
                                            <div className="onboardForm ">
                                        <h4 className="section-title text-center">Verification Code</h4>
                                        <h6 className="section-sub-title text-center">Please Enter 6 Digit Verification Code,send to {this.state.mobileNo}</h6>
                                        <input onChange={this.OtpOnChange} className="form-control m-2" type="text" placeholder="xxxxxx"/>
                                        <button onClick={this.onNextClick} className="btn btn-danger loginbtn m-2 ">{this.state.btn}</button>
                                               </div>

                                            </Col>

                                            <Col md={6} lg={6} sm={12} xm={12}  className="loginimg">
                                            <img className="img-fluid" src={image} alt="" />
                                            </Col>
                                        </Row>

                        
                    </Col>

                    
                </Row>
            </Container>
            {this.onUserRedirect()}
            <ToastContainer />
            </Fragment>
        );
    }
}

export default OtpVerification;