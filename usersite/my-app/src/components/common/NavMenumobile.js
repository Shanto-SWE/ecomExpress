import React, { Component,Fragment } from 'react';
import {Container,Navbar,Row,Col,Card,Button,Dropdown} from 'react-bootstrap'
import {Link} from "react-router-dom";
import MegaMenu from '../home/MegaMenu';
import MegaMenuMobile from '../home/MegaMenuMobile';
import axios from "axios";
import ApiURL from '../../api/ApiUrl';
import LocalStorageHelper from '../../LocalStorageHelper/LocalStorageHelper';

class NavMenumobile extends Component {





    constructor(){

        super();

        this.state={
            SideNavState:"sideNavClose",
            ContentOverState:"ContentOverlayClose",
            MenuData:[],
            cartCount:0,
            NotificationCount:0
        }
    }
    componentDidMount() {

        axios.get(ApiURL.sendCategoryDetails).then(response=> {
            this.setState({MenuData:response.data})
        })

        // cart count
        axios.get(ApiURL.CartCount(LocalStorageHelper.getUserMobile())).then((res)=>{
            this.setState({cartCount:res.data})
        })
          // notification count
          axios.get(ApiURL.NotificationHistoryCount).then((res)=>{
            this.setState({NotificationCount:res.data});
        })
    }

    notifictionClick=()=>{
        // notification read update
        axios.get(ApiURL.NotificationHistoryRead).then((res)=>{
           
        })
    }

MenuBarClickHandler=()=>{

this.MenuBarOpenOrClose();
    
}
ContentOverlayClickHandler=()=>{
    this.MenuBarOpenOrClose();

}



MenuBarOpenOrClose=()=>{
let sideNavState=this.state.SideNavState;
let contentOverlayState=this.state.contentOverlayState;

if(sideNavState==="sideNavClose"){
    this.setState({SideNavState:"sideNavOpen",ContentOverState:"ContentOverlayOpen"});

}else{
    this.setState({SideNavState:"sideNavClose",ContentOverState:"ContentOverlayClose"});
    
}

}
    render() {

        
        let UserMobile= LocalStorageHelper.getUserMobile();

        
        if(UserMobile===null){
            return (
                <Fragment>
    
                   <Navbar fluid={true} className="fixed-top shadow-sm p-2 m-0 big-white">
                   <a href="#" onClick={this.MenuBarClickHandler} className="mx-2 navbar-brand "><i className="fa fa-bars"></i></a>
                
    
    
                    <div className="float-right">
                     
                            <Link to="/" className="btn mx-1 nav-round-btn"><i className="fa fa-search"/> </Link>
                              <Link to="/cart" className="cart-btn float-right mx-3"><i className="fa fa-shopping-cart"/> {this.state.cartCount} items </Link>
                             
                              <Link to="/notification" href=""  onClick={this.notifictionClick}  className="btn"> <i className="fa h4 fa-bell"></i> <sub><span className="badge bg-danger">{this.state.NotificationCount}</span></sub></Link>
                           
                            </div>

                            <div className="float-right px-1">
        
                            
                            <Link to="/login" className="btn btn-danger">SIGN IN</Link>

                            </div>
    
                   </Navbar>
    
                   <div className={this.state.SideNavState}>
           
                   <MegaMenuMobile data={this.state.MenuData}/>
                   </div>
                   <div onClick={this.ContentOverlayClickHandler} className={this.state.ContentOverState}>
    
    
                 </div>
                    
                </Fragment>
            );

        }else{


            return (
                <Fragment>
    
                   <Navbar fluid={true} className="fixed-top shadow-sm p-2 m-0 big-white">
                   <a href="#" onClick={this.MenuBarClickHandler} className="mx-2 navbar-brand "><i className="fa fa-bars"></i></a>
                
    
    
                    <div className="float-right">
                             <Link to="/" className="btn mx-1 nav-round-btn"><i className="fa fa-search"/> </Link>
                              <Link to="/cart" className="cart-btn float-right mx-3"><i className="fa fa-shopping-cart"/> {this.state.cartCount} items </Link>
                            
                              <Link to="/notification" href="" className="btn"> <i className="fa h4 fa-bell"></i> <sub><span className="badge bg-danger">4</span></sub></Link>
                            
                     
                            </div>


                            <div className="float-right px-1">
        
                                            
                            <Dropdown className="">
                    <Dropdown.Toggle variant="white" id="dropdown-basic">
                    <i className="fa h4 fa-user"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    {/* <Link to="/favourite" href="" className="btn">Favourite Items</Link> */}
                    <Dropdown.Item> 

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
                    
                   </Navbar>
    
                   <div className={this.state.SideNavState}>
           
                   <MegaMenuMobile data={this.state.MenuData}/>
                   </div>
                   <div onClick={this.ContentOverlayClickHandler} className={this.state.ContentOverState}>
    
    
                 </div>
                    
                </Fragment>
            );

        }
        
    }
}

export default NavMenumobile;