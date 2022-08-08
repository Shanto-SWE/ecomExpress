
import React, { Component } from 'react';
import Slider from "react-slick";
import {Container,Row,Col,Card,Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'

class SliderHomeMobile extends Component {
    render() {

        const settings = {
            dots: true,
            infinite: true,
            // autoplay:true,
            // autoplaySpeed:3000,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };

          const sliderList=this.props.data;
    
          const MyView=sliderList.map((slider,i)=>{
              return <div  key={i.toString()} className="container-fluid bg-light p-0 m-0 overflow-hidden w-100  sliderhomemobile">
              <div style={{  backgroundColor:slider.bg_color}} className=" w-100 h-100">


          
              <div className="row card-body sliderrow">
              <div className="col-md-6 sliderTitleDiv text-center pb- p-5">
               

               <h1 style={{color:slider.text_color}} className="sliderTitle pb-2">{slider.title}</h1>
               <h1  style={{color:slider.text_color}} className="sliderSubTitle">{slider.subtitle}</h1>
               <Link  to={"/productDetails/"+slider.subcategory+"/"+slider.product_code} className="btn site-btn px-5">More Info</Link>

              </div>
              <div className="col-md-6  text-center">
              <img  className="slider-img sliderImg img-fluid" src={slider.image} alt="" />
               
     

              </div>

              </div>

              </div>

              </div>
    })
        return (
            <div>
            <Slider {...settings}>


            {MyView}
            
           

     
   </Slider>
       </div>
        );
    }
}

export default SliderHomeMobile;