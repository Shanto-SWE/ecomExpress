import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Form,Button,Breadcrumb} from 'react-bootstrap';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import {Link} from "react-router-dom";
import ProductListLoader from '../placeholder/ProductListLoader';


class SearchList extends Component {

    constructor(){

        super();
        this.state={
            productData:[],
            isLoading:'',
            mainDiv:'d-none'
    
        }

    }

    componentDidMount(){
        window.scroll(0,0);
     
        axios.get(ApiUrl.SearchByProduct(this.props.searchKey)).then(response=>{
   
            if(response.status==200){
                let data=response.data;
        
     
                this.setState({productData:data,isLoading:'d-none',mainDiv:''});
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

        const searchKey=this.props.searchKey;
        const MyList=this.state.productData;

        const MyView=MyList.map((ProductList,i)=>{
            if(ProductList.discount_price=="0"){
                return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                    <Link to={"/productDetails/"+ProductList.product_code}>
                        <Card className="card h-100 w-100  image-box ">
                            <img src={ProductList.product_image}/>
                            <Card.Body>
                                <h5 className="product-name-on-card">{ProductList.product_name }</h5>
                                <p className="product-price-on-card">Price: { ProductList.price}TK</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            }
            else{

                return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                    <Link to={"/productDetails/"+ProductList.product_code}>
                        <Card className="card h-100 w-100  image-box ">
                            <img src={ProductList.product_image}/>
                            <Card.Body>
                                <h5 className="product-name-on-card">{ProductList.product_name }</h5>
                                <p className="product-price-on-card">
                                    Price: <strike class="text-secondary">{ ProductList.price}TK</strike>  { ProductList.discount_price}TK
                                </p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            }

        })
        return (
            <Fragment>
           <ProductListLoader isLoading={this.state.isLoading}></ProductListLoader>
            <div  className={this.state.mainDiv}>

            <Container className="text-center  pt-3 TopSection" fluid={true}>
                    <Breadcrumb>
                        <Breadcrumb.Item> <Link to="/">Home</Link>    </Breadcrumb.Item>
                        <Breadcrumb.Item> <Link to={"/ProductListBySearch/"+searchKey}>Search Result For: {searchKey}</Link>    </Breadcrumb.Item>

                    </Breadcrumb>
                    <Row>
                    <h4 className="section-title pt-5 pb-3">Search Result For: {this.props.searchKey}</h4>
                    {MyView}
                    </Row>
                </Container>

          
            </div>
            </Fragment>
            
        );
    }
}

export default SearchList;