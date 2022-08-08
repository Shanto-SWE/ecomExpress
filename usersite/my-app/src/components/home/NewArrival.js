import React, { Component,Fragment } from 'react';
import Slider from "react-slick";
import {Container,Row,Col,Card} from 'react-bootstrap';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import NewArrivalPlaceholder from '../placeholder/NewArrivalPlaceholder';
import {Link} from "react-router-dom";


class NewArrival extends Component {


    constructor(props){


        super(props);
        this.state={
          productList:[],
          isLoading:'',
          mainDiv:'d-none'
      }
        this.next=this.next.bind(this);
        this.previous=this.previous.bind(this);


    }

    next(){
    this.silder.slickNext();

    }
    previous(){
        this.silder.slickPrev();


    }
    componentDidMount(){

     
      axios.get(ApiUrl.productListByRemark('NEW')).then(response=>{
 
          if(response.status==200){
              let data=response.data;
    
              this.setState({productList:data,isLoading:'d-none',mainDiv:''});
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

      const myList=this.state.productList;
      const MyView=myList.map((productlist,i)=>{
          if(productlist.discount_price=="0"){
              return <div>
                           <Link  to={"/productDetails/"+productlist.subcategory+"/"+productlist.product_code}>
              <Card className="p-1 card h-100 w-100  image-box ">
 
                            
                            <img src={productlist.product_image} alt="" />
    
                           <Card.Body>
       
                           <h5 className="product-name-on-card">{productlist.product_name}</h5>
                           <p className="product-price-on-card">Price: {productlist.price}TK</p>
                            </Card.Body>
                            </Card>
                            </Link>
              </div>
          }else{

              return <div>
                                         <Link  to={"/productDetails/"+productlist.subcategory+"/"+productlist.product_code}>
              <Card className="p-1 card h-100 w-100  image-box ">
                            
                            <img src={productlist.product_image}  alt="" />
    
                           <Card.Body>
       
                           <h5 className="product-name-on-card">{productlist.product_name}</h5>
           
               
           <p className="product-price-on-card">
           
           
           Price: <strike className="text-secondary ml-2">{productlist.discount_price}TK</strike>   {productlist.price}TK
           
           
           
           
           </p>
                                      
                            </Card.Body>
                            </Card>
                            </Link>
              </div>
          }


              
          



      })
        var settings = {
            dots: false,
            infinite: true,
            autoplay:true,
            autoplaySpeed:3000,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
        return (
            <Fragment>

         <NewArrivalPlaceholder isLoading={this.state.isLoading}></NewArrivalPlaceholder>
            <div  className={this.state.mainDiv}>
            <Container className="text-center mt-5" fluid={true}>
              <h4 className="section-title">NEW ARRIVAL
                        <a className="btn btn-sm ml-2 site-btn m-1" onClick={this.previous} ><i className="fa fa-angle-left"/>
                        </a>
                    <a className="btn btn-sm ml-2 site-btn" onClick={this.next}>
                        <i className="fa fa-angle-right"/>
                    </a>
                </h4>
                            <h6 className="section-sub-title">Some Of Our Exclusive Collection, You May Like</h6>
        <Slider ref={c=>(this.silder=c)} {...settings}>
          
     
     
     {MyView}
        
     
        
        </Slider>
        
        </Container>
            </div>
              
            </Fragment>
        );
    }
}

export default NewArrival;