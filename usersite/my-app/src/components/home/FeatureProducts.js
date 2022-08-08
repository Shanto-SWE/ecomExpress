import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import FeaturedProductLoader from '../placeholder/FeaturedProductLoader';

class FeatureProducts extends Component {


    constructor(){

        super();
        this.state={
            productList:[],
            isLoading:'',
            mainDiv:'d-none'
        }
    }
    componentDidMount(){

     
        axios.get(ApiUrl.productListByRemark('FEATURED')).then(response=>{
   
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
                return <Col className="p-1" key={1} xl={2} lg={2} md={3} sm={4} xs={6}>

                <Link to={"/productDetails/"+productlist.subcategory+"/"+productlist.product_code}>
        
        
                <Card className="card h-100 w-100  image-box ">
                
                <img src={productlist.product_image} alt="" />
               <Card.Body>
        
                  
                <h5 className="product-name-on-card">{productlist.product_name}</h5>
                <p className="product-price-on-card">Price: {productlist.price}TK</p>
                          
                </Card.Body>
                </Card>
                </Link>
                </Col>
            }else{

                return <Col className="p-1" key={1} xl={2} lg={2} md={3} sm={4} xs={6}>

                <Link to={"/productDetails/"+productlist.subcategory+"/"+productlist.product_code}>
        
        
                <Card className="card h-100 w-100  image-box ">
                
                <img src={productlist.product_image} alt="" />
               <Card.Body>
        
                  
                <h5 className="product-name-on-card">{productlist.product_name}</h5>
           
               
                <p className="product-price-on-card">
                
                
                Price: <strike className="text-secondary ml-2">{productlist.discount_price}TK</strike>   {productlist.price}TK
                
                
                
                
                </p>
           
                          
                </Card.Body>
                </Card>
                </Link>
                </Col>
            }


                
            



        })
        return (
            <Fragment>
             <FeaturedProductLoader isLoading={this.state.isLoading}></FeaturedProductLoader>


            <div  className={this.state.mainDiv}>
            <Container className="text-center BetweenTwoSection mt-5" fluid={true}>
                            <h4 className="section-title">FEATURED PRODUCTS</h4>
                            <h6 className="section-sub-title">Some Of Our Exclusive Collection, You May Like</h6>
              
                    <Row>
    
             
               {MyView}
              
                    </Row>

                </Container>
                
            </div>
       
            </Fragment>
        );
    }
}

export default FeatureProducts;