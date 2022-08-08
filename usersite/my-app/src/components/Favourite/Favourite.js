import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Button} from 'react-bootstrap';
import{Link} from "react-router-dom";
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import LocalStorageHelper from '../../LocalStorageHelper/LocalStorageHelper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";
import ProductListLoader from '../placeholder/ProductListLoader';
import createUtilityClassName from 'react-bootstrap/esm/createUtilityClasses';

class Favourite extends Component {


    constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none",
            PageRefreshStatus:false,
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiUrl.FavouriteList(LocalStorageHelper.getUserMobile())).then(response=> {
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:" "})
        })
    }
    removeItem=(event)=>{
        let code=  event.target.getAttribute('data-code');
        let mobile=LocalStorageHelper.getUserMobile();
  
        axios.get(ApiUrl.removeFavItem(code,mobile)).then((res)=>{
            if(res.data===1){
                toast.success('Item Removed',{

                    theme: "colored",
                    position:"bottom-center"
                });
      
                this.setState({PageRefreshStatus:true})
            }
            else{
                toast.error('Request Fail ! Try Again',{

                    theme: "colored",
                    position:"bottom-center"
                });
            }
        }).catch((err)=>{
            toast.error('Request Fail ! Try Again',{

                theme: "colored",
                position:"bottom-center"
            });
        })
  
  
      }
  
      PageRefresh=()=>{
          if(this.state.PageRefreshStatus===true){
            window.location.reload(false);
          }
      }

   nameString(name) {

    if(name.length>25){
        let product_name=name.substring(0, 20);
       

        return  <h5 className="product-name-on-card">{product_name+"..."}</h5>;
    }else{
        return  <h5 className="product-name-on-card">{name}</h5>;

    }
   
}

    render() {

        const MyList=this.state.ProductData;
        console.log(MyList)
       
        const MyView=MyList.map((ProductList,i)=>{
                return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                      <Card className="card h-100 w-100  image-box ">
                        <img src={ProductList.product_image} alt="" />

                       <Card.Body>

                       {this.nameString(ProductList.product_name)}
                      
                        <Button onClick={this.removeItem} data-code={ProductList.product_code} className="btn btn-danger mt-2"><i className="fa fa-trash-alt"></i> Remove</Button>
                        <Link to={"/productDetails/"+ProductList.subcategory+"/"+ProductList.product_code}  className="btn btn-danger mt-2 mx-2"> Details</Link>
                                  
                        </Card.Body>
                        </Card>

                </Col>

        })

        return (
            <Fragment>


                  <ProductListLoader isLoading={this.state.isLoading}></ProductListLoader>

                           <div  className={this.state.MainDiv}>



                          <Container className="text-center TopSection" fluid={true}>
                            <h4 className="section-title pt-5 pb-3 ">Your Favourite Items</h4>
                            
                <Row className="">
                    {MyView}
                
               
                </Row>
            </Container>
            <ToastContainer />
            {this.PageRefresh()}
            </div>
                
            </Fragment>
        );
    }
}

export default Favourite;