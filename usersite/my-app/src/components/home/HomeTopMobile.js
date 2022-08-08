import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';
import SliderHomeMobile from './SliderHomeMobile';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import SliderLoader from '../placeholder/SliderLoader'



class HomeTopMobile extends Component {

    constructor(){

        super();
        this.state={
           
            sliderData:[],
            isLoading:'',
            mainDiv:'d-none'
        }
    }

        componentDidMount(){

     

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
                

                    <Col lg={12} md={12} sm={12}>
                    <SliderHomeMobile data={this.state.sliderData}></SliderHomeMobile>
                 
                 </Col>
                </Row>
            </Container>
            </div>
            </Fragment>
        );
    }
}

export default HomeTopMobile;