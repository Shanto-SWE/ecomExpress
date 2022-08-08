import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Form,Button} from 'react-bootstrap';
import axios from "axios";
import ApiUrl from '../../api/ApiUrl';
import validation from '../../validation/validation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Navigate } from "react-router-dom";


class UserLogin extends Component {


    constructor() {
        super();
        this.state={
            btn:"Next",
            MobileNo:"",
            UserRedirect:false
        }
        this.MobileOnChange=this.MobileOnChange.bind(this);
        this.onNextClick=this.onNextClick.bind(this);
        this.onUserRedirect=this.onUserRedirect.bind(this);
    

    }
    MobileOnChange(event){
        let mobile=  event.target.value;
        this.setState({MobileNo:mobile});
      }


      onNextClick(){
        let mobile= this.state.MobileNo;
        if(mobile.length==0){
            toast.error('Mobile number is required',{
    
                theme: "colored",
                position:"bottom-center"
            });
        }
        else if(!(validation.MobileRegx).test(mobile)){
            toast.error('Valid mobile is requird',{
                theme: "colored",
                position:"bottom-center"
            });
        }
        else {
            this.setState({btn:"Processing.."});

            // axios call
            axios.get(ApiUrl.createOtp(mobile)).then((response)=>{
                this.setState({btn:"Next"});
                if(response.status===200  && response.data===1){
                    toast.success('Verification code has been sent',{
                        theme: "colored",
                        position:"bottom-center"
                    });
                    this.setState({UserRedirect:true});
                }
                else {
                    toast.error('Request Faildd ! Try Again',{
                        theme: "colored",
                        position:"bottom-center"
                    });
                 
                }
            }).catch((error)=>{
                this.setState({btn:"Next"});
                toast.error('Request Fail ! Try Again',{
                    theme: "colored",
                    position:"bottom-center"
                });
            })
        }
    }

    onUserRedirect(){
        if(this.state.UserRedirect===true){
            return <Navigate to={"/OptVerification/"+this.state.MobileNo} />
        }
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
                                        <h4 className="section-title text-center">USER SIGN IN</h4>
                                        <h6 className="section-sub-title text-center">Please Enter Your Mobile No, And Go Next</h6>
                                        <input onChange={this.MobileOnChange} className="form-control m-2" type="text" placeholder="Mobile Number"/>
                                        <button onClick={this.onNextClick} className="btn btn-danger loginbtn m-2 ">{this.state.btn}</button>
                                               </div>

                                            </Col>

                                            <Col md={6} lg={6} sm={12} xm={12} className="loginimg">
                                            <img className="img-fluid" src="image/loginwithphone.jpg" alt="" />
                                            </Col>
                                        </Row>

                        
                    </Col>

                    
                </Row>
            </Container>
            <ToastContainer />
            {this.onUserRedirect()}
            </Fragment>
        );
    }
}

export default UserLogin;