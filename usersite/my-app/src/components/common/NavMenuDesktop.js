import React, { Component } from 'react';
import {Container,Navbar,Row,Col,Card,Button,Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import logo from '../../../src/assets/image/logo.png';
import { Navigate } from "react-router-dom";
import LocalStorageHelper from '../../LocalStorageHelper/LocalStorageHelper';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';

class NavMenuDesktop extends Component {

    constructor() {
        super();
        this.state={
            SearchKey:"",
            SearchRedirectStatus: false,
            RedirectHome:false,
            pageloading:false,
            cartCount:0,
            NotificationCont:0,
   
         
        }
        this.SearchOnChange=this.SearchOnChange.bind(this);
        this.SearchOnClick=this.SearchOnClick.bind(this);
        this.searchRedirect=this.searchRedirect.bind(this);
        this.notifictionClick=this.notifictionClick.bind(this);
        this.pageloading=this.pageloading.bind(this);


    }
    componentDidMount() {
        window.scroll(0,0);
        axios.get(ApiUrl.CartCount(LocalStorageHelper.getUserMobile())).then((res)=>{
            this.setState({cartCount:res.data});
        })



        // notification count
        axios.get(ApiUrl.NotificationHistoryCount).then((res)=>{
            this.setState({NotificationCont:res.data});
        })
    
    }
    
    SearchOnChange(event){
        let SearchKey=  event.target.value;
        this.setState({SearchKey:SearchKey});
      }
  
      notifictionClick(){
            // notification read update
            axios.get(ApiUrl.NotificationHistoryRead).then((res)=>{
               
            })

    
      }
  
      SearchOnClick(){
          if(this.state.SearchKey.length>=2){
              this.setState({SearchRedirectStatus:true})
        
          }
      }

      searchRedirect(){
        if(this.state.SearchRedirectStatus===true){
       
            
            this.setState({SearchRedirectStatus:false});
            this.setState({pageloading:true});
     
            return (
            <Navigate  to={"/ProductListBySearch/"+this.state.SearchKey} />
      
            )
           
        }
    }

    pageloading=()=>{
        if(this.state.pageloading===true){

        window.location.reload(false);
        }
    }
 
    signOut=()=>{
        LocalStorageHelper.removeUserMobile();
        this.setState({RedirectHome:true});
    }


    RedirectHome=()=>{
        if(this.state.RedirectHome===true){
            return <Navigate  to={"/"}/>
        }
    }
    
    render() {


        let UserMobile= LocalStorageHelper.getUserMobile();

        if(UserMobile===null){


            return (
          
   
  
     

                <Container fluid={true} className="fixed-top shadow-sm p-2 m -0 bg-white">
          
          
             
                    <Row>
                 <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
          
                 <Link to="/" className="btn"  > <img alt="" className="nav-logo img-fluid" src={logo}/> </Link>
          
                 <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart p-1"></i> {this.state.cartCount}  items</Link>
          
                 </Col>
                 <Col lassName="p-2" lg={6} md={6} sm={12} xs={12}>
                  
                 <div className="input-group w-100 p-2">
                                          <input onChange={this.SearchOnChange} type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                          <button onClick={this.SearchOnClick}  type="button" className="btn site-btn"><i className="fa fa-search"/></button>

                               
                                         <Link to="/notification" href="" onClick={this.notifictionClick} className="btn mx-1"> <i className="fa h4 fa-bell"></i> <sub><span className="badge bg-danger">{this.state.NotificationCont}</span></sub></Link>
                                      </div>
          
          
                  </Col>
                  <Col className="p-2" lg={2} md={2} sm={12} xs={12}>
                    
                 
               
          
                
                  <Link to="/login" className="btn btn-danger">SIGN IN</Link>
               
          
                  </Col>
          
                    </Row>
                    {this.searchRedirect()}
                    {this.RedirectHome()}
                </Container>
          
            
                     
                  );

        }else{

            return (
          
   
  
     

                <Container fluid={true} className="fixed-top shadow-sm p-2 m -0 bg-white">
          
          
             
                    <Row>
                 <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
          
                 <Link to="/" className="btn"  > <img alt="" className="nav-logo img-fluid" src={logo}/> </Link>
          
                 <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart p-1"></i> {this.state.cartCount}  items</Link>
          
                 </Col>
                 <Col lassName="p-2" lg={6} md={6} sm={12} xs={12}>
                  
                 <div className="input-group w-100 p-2">
                                          <input onChange={this.SearchOnChange} type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                          <button onClick={this.SearchOnClick}  type="button" className="btn site-btn"><i className="fa fa-search"/></button>

                                          {/* <Link to="/favourite" href="" className="btn"> <i className="fa h4 fa-heart"></i> <sub><span className="badge bg-danger">4</span></sub></Link> */}
                                         <Link to="/notification" href="" className="btn px-3"> <i className="fa h4 fa-bell"></i> <sub><span className="badge bg-danger">4</span></sub></Link>
                                         
                                      </div>
               
          
                  </Col>
                  <Col className="p-2" lg={2} md={2} sm={12} xs={12}>
               
     
                  <div className="input-group w-100 ">
                 
                  <Dropdown className="">
                    <Dropdown.Toggle variant="white" id="dropdown-basic">
                    <i className="fa h4 fa-user"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    {/* <Link to="/favourite" href="" className="btn">Favourite Items</Link> */}
                    <Dropdown.Item >
                    <Link to="/cart" className='text-black'>
                        
                        Cart Items
                            </Link>
                     
                     </Dropdown.Item>
                    <Dropdown.Item >
                    <Link to="/favourite" className='text-black'>
                    Favourite Items
                    </Link>
           
                     
                     </Dropdown.Item>

                        <Dropdown.Item > <i className="fa  fa-order"></i> 
                        
                        <Link to="/orderList" className='text-black'>
                        
                      Order List
                            </Link>
                         </Dropdown.Item>
                        <Dropdown.Item onClick={this.signOut}> <i className="fa fa-sign-out"></i>  Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
          
                  
              
                    </div>
          
                  </Col>
          
                    </Row>
                    {this.searchRedirect()}
                    {this.RedirectHome()}
                    {this.pageloading()}
                </Container>
          
            
                     
                  );

        }

    }
}

export default NavMenuDesktop;