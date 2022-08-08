import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';

import SliderHome from './SliderHome';
import MegeMenu from'./MegaMenu';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import SliderLoader from '../placeholder/SliderLoader';



class HomeTop extends Component {

    constructor(){

        super();
        this.state={
            menuData:[],
            sliderData:[],
            isLoading:'',
            mainDiv:'d-none'
        }
    }

        componentDidMount(){

     
                axios.get(ApiUrl.sendCategoryDetails).then(response=>{
           
                    if(response.status==200){
                        let data=response.data;
              
                        this.setState({menuData:data});
                       }else{
       
                           toast.error('Something went wrong! try again',{
       
                               theme: "colored",
                               position:"bottom-center"
                           });
                       }
                   
                 }).catch(error=>{
                    
         
                 })

                //  send slider info
           
                axios.get(ApiUrl.sendSliderInfo).then(response=>{
           
                    if(response.status==200){
                        let data=response.data;
                     
              
                        this.setState({sliderData:data,isLoading:'d-none',mainDiv:''});
                       }else{
       
                           toast.error('Something went wrong! try again',{
       
                               theme: "colored",
                               position:"bottom-center"
                           });
                       }
                   
                 }).catch(error=>{
                    
         
                 })
    
        
        }
    render() {
        return (
            <Fragment>
              <SliderLoader isLoading={this.state.isLoading}></SliderLoader>
              <div className={this.state.mainDiv}>
              <Container className="p-0 TopSection  overflow-hidden" fluid={true}>
                <Row>
                    <Col lg={3} md={3} sm={12}>
                
                    <MegeMenu data={this.state.menuData}>

                    </MegeMenu>

                    </Col>

                    <Col lg={9} md={9} sm={12}>
                    <SliderHome data={this.state.sliderData}></SliderHome>
                 </Col>
                </Row>
            </Container>
                
              </div>

             
                
            </Fragment>
        );
    }
}

export default HomeTop;