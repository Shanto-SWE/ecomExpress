import React, {Component, Fragment} from 'react';
import {Container,Row,Col,Card} from "react-bootstrap";
import axios from 'axios';
import ApiUrl from '../../api/ApiUrl';
import {Link} from "react-router-dom";

class SuggestedProducts extends Component {


 

    render() {
        let MyList=this.props.similarProduct;
   

        if(MyList.length>0){

            const MyView=MyList.map((productlist,i)=>{
                if(productlist.discount_price=="0"){
                    return <Col className="p-1" key={1} xl={2} lg={2} md={3} sm={4} xs={6}>
    
                    <Link  to={"/productDetails/"+productlist.subcategory+"/"+productlist.product_code}>
            
            
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
    
                    <Link  to={"/productDetails/"+productlist.subcategory+"/"+productlist.product_code}>
            
            
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
                <Container fluid={true} className="text-center BetweenTwoSection">
                    <h4 className="section-title">YOU MAY LIKE</h4>
                    <h6 className="section-sub-title">Some Of Our Exclusive Collection, You May Like</h6>
                    <Row>
                    
               {MyView}
                        
                    </Row>
                </Container>
            </Fragment>
            );

        }else{

            return (
                <Fragment>
            
                
            </Fragment>
            );

        }



       
    }
}

export default SuggestedProducts;