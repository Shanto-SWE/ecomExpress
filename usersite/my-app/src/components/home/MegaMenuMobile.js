import React, { Component,Fragment,useState } from 'react';
import logo from '../../../src/assets/image/logo.png';
import {Link} from 'react-router-dom';
import { FaBeer,FaAddressCard } from 'react-icons/fa';
import { BsFillQuestionCircleFill,BsFillArrowRightCircleFill,BsFillFileLockFill,BsFillFileTextFill,BsFilePersonFill } from "react-icons/bs";
import LocalStorageHelper from '../../LocalStorageHelper/LocalStorageHelper';
import { Navigate } from "react-router-dom";




class MegaMenuMobile extends Component {

    constructor() {
        super();
        this.state={
         
            RedirectHome:false,
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
    
    MenuItemClick=(event)=>{
        event.target.classList.toggle("active");
        let panel=event.target.nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
        }
        else{
            panel.style.maxHeight=panel.scrollHeight+ "px"
        }
    }
  
    render() {
        const myList=this.props.data
        const MyView=myList.map((category,i)=>{
            return <div key={i.toString()}>
                <button onClick={this.MenuItemClick} className="accordionMobile"> <img alt="" className="accordionMenuIconMobile" src=""/>  {category.category_name}</button>
                <div className="panelMobile">
                <ul>
                {
                            (category.subcategory).map((subcategory,i)=>{
                                return  <li key={i.toString()}>
                                    <Link to={"/productListBySubcategory/"+subcategory.category_name+"/"+subcategory.subcategory_name} className="accordionItemMobile">{subcategory.subcategory_name}</Link>
                                </li>
                            })
                        }

              </ul>
                </div>
            </div>
        })


        let UserMobile= LocalStorageHelper.getUserMobile();
        if(UserMobile===null){
            return (
                <Fragment>
                <div className="accordionMenuDivMobile">
             
    
                  <div className="accordionMenuDivInsideMobile">
                  
                  <Link to="/"  className="btn"> <img alt="logo" className="nav-logo mb-4" src={logo}/> </Link>
    
             
             {MyView}
    
             <div className="accordionMenuMobileExtra px-2 mt-3 mb-5">
             <div>
    
             <Link to="/about" className="accordionMenuMobile-extra "><BsFillQuestionCircleFill/> About Us</Link>
             </div>
             <div className='mt-3'>
             <Link to="/contact" className="accordionMenuMobile-extra "><FaAddressCard/> Contact Us</Link>
                
            </div>
            <div className='mt-3'>
            <Link to="/purchase" className="accordionMenuMobile-extra"><BsFillQuestionCircleFill/> How To Purchese</Link>
                        
            </div>
            <div className='mt-3'>
                
                
            <Link to="/policy" className="accordionMenuMobile-extra"><BsFillFileLockFill/> Privacy Policy</Link>
                        
            </div>
            <div className='mt-3'>
            <Link to="/refund" className="accordionMenuMobile-extra"><BsFillFileTextFill/> Refund Policy</Link>
                        
            </div>
            <div className='mt-3'>
            <Link to="/login" className="btn btn-danger mt-2"><BsFillArrowRightCircleFill /> SIGN IN</Link>
                        
            </div>
    
       
    
       
         
                   
    
             </div>
              
        
    
                  </div>
              
             
                
                </div>
    
                {this.RedirectHome()}
           
                </Fragment>
            );
        }else{


            return (
                <Fragment>
                <div className="accordionMenuDivMobile">
             
    
                  <div className="accordionMenuDivInsideMobile">
                  
                  <Link to="/"  className="btn"> <img alt="logo" className="nav-logo mb-4" src={logo}/> </Link>
    
             
             {MyView}
    
             <div className="accordionMenuMobileExtra px-2 mt-3 mb-5">
             <div>
    
             <Link to="/about" className="accordionMenuMobile-extra "><BsFillQuestionCircleFill/> About Us</Link>
             </div>
             <div className='mt-3'>
             <Link to="/contact" className="accordionMenuMobile-extra "><FaAddressCard/> Contact Us</Link>
                
            </div>
            <div className='mt-3'>
            <Link to="/purchase" className="accordionMenuMobile-extra"><BsFillQuestionCircleFill/> How To Purchese</Link>
                        
            </div>
            <div className='mt-3'>
                
                
            <Link to="/policy" className="accordionMenuMobile-extra"><BsFillFileLockFill/> Privacy Policy</Link>
                        
            </div>
            <div className='mt-3'>
            <Link to="/refund" className="accordionMenuMobile-extra"><BsFillFileTextFill/> Refund Policy</Link>
                        
            </div>
            <div className='mt-3'>
            <button onClick={this.signOut} className="btn btn-danger mt-2"><BsFilePersonFill /> SIGN OUT</button>
                        
            </div>
    
       
    
       
         
                   
    
             </div>
              
        
    
                  </div>
              
        
                
                </div>
                {this.RedirectHome()}
    
           
                </Fragment>
            );
        }

      
    }
}

export default MegaMenuMobile;