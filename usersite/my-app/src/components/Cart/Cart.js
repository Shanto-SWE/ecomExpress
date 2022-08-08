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

class Cart extends Component {



    constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none",
            PageRefreshStatus:false,
            PageRedirectStatus:false,
            confirmBtn:"Confirm Order",
            totalPriceSum:"",
            city:"",
            payment:"",
            name:"",
            address:"",
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiUrl.CartList(LocalStorageHelper.getUserMobile())).then(response=> {
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:" "})
        })
    }

    removeItem=(event)=>{
        let id=event.target.getAttribute('data-id');
        
  
        axios.get(ApiUrl.removeCartItem(id)).then((res)=>{
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
      itemPlus=(id,quantity,price)=>{
        axios.get(ApiUrl.CartItemPlus(id,quantity,price)).then((res)=>{
            if(res.data===1){

                toast.success('Item Quantity Increased',{

                    theme: "colored",
                    position:"bottom-center"
                });
             
                this.setState({PageRefreshStatus:true})
            }
            else {
                cogotoast.error('Request Fail ! Try Again',{

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
     itemMinus=(id,quantity,price)=>{
   
        axios.get(ApiUrl.CartItemMinus(id,quantity,price)).then((res)=>{
            if(res.data===1){

                toast.success('Item Quantity Decreased',{

                    theme: "colored",
                    position:"bottom-center"
                });
             
                this.setState({PageRefreshStatus:true})
            }
            else {
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
    cityOnChange=(event)=>{
        let city= event.target.value;
        this.setState({city:city})
      }
      paymentMethodOnChange=(event)=>{
          let payment= event.target.value;
          this.setState({payment:payment})
      }
      nameOnChange=(event)=>{
          let name= event.target.value;
          this.setState({name:name})
      }
  
      addressOnChange=(event)=>{
          let address= event.target.value;
          this.setState({address:address})
      }
      confirmOnClick=()=>{
        let city= this.state.city;
        let payment=this.state.payment;
        let name=this.state.name;
        let address=this.state.address;

        if(city.length===0){

            toast.error('Please select city',{

                theme: "colored",
                position:"bottom-center"
            });
        }
        else if(payment.length===0){
      
            toast.error('elect payment method',{

                theme: "colored",
                position:"bottom-center"
            });
        }
        else if(name.length===0){
     
            toast.error('"Your name required',{

                theme: "colored",
                position:"bottom-center"
            });
        }
        else if(address.length===0){
       
            toast.error('Delivery address required',{

                theme: "colored",
                position:"bottom-center"
            });
        }
        else{

            let invoice=new Date().getTime();
            let MyFormData=new FormData();
            MyFormData.append('city',city)
            MyFormData.append('paymentMethod',payment)
            MyFormData.append('yourName',name)
            MyFormData.append('deliveryAddress',address)
            MyFormData.append('mobileNumber',LocalStorageHelper.getUserMobile())
            MyFormData.append('invoice_no',invoice)
            MyFormData.append('ShippingPrice',"0000");

            axios.post(ApiUrl.CartOrder,MyFormData).then((res)=>{
                if(res.data===1){
                   
                    toast.success('Order request received',{

                        theme: "colored",
                        position:"bottom-center"
                    });
                    this.setState({PageRedirectStatus:true});
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
    }
    PageRedirect=()=>{
        if(this.state.PageRedirectStatus===true){
            return <Navigate to={"/orderList"} />
        }
    }
    PageRefresh=()=>{
        if(this.state.PageRefreshStatus===true){
            window.location.reload(false);
        }
    }
    render() {
        const MyList=this.state.ProductData;
        let totalPriceSum=0;
       
        const MyView=MyList.map((ProductList,i)=>{
            totalPriceSum=totalPriceSum+parseInt(ProductList.total_price)
                return <div className="container">
                <div className="row">
                    <div className="col-md-3 text-center col-lg-3 col-sm-4 col-6">
                        <img className="w-100" src={ProductList.image} alt=""/>
                        <button onClick={this.removeItem} data-id={ProductList.id}  className="btn mt-2 btn-sm site-btn"><i className="fa fa-trash-alt"/></button>
                        <button onClick={()=>this.itemPlus(ProductList.id,ProductList.product_quantity,ProductList.unit_price)}   className="btn mt-2 mx-1 btn-sm site-btn"><i className="fa fa-plus"/></button>
                        <button  onClick={()=>this.itemMinus(ProductList.id,ProductList.product_quantity,ProductList.unit_price)}  className="btn mt-2 mx-1 btn-sm site-btn"><i className="fa fa-minus"/></button>
                    </div>
                    <div className="col-md-7 col-lg-7 col-sm-8 col-6">
                                   {this.nameString(ProductList.product_name)}
                        <h5 className="product-price-on-card">Total Price:{ProductList.total_price}TK</h5>
                        <h5 className="product-name-on-card">{(ProductList.product_info)}</h5>
                        <h5 className="product-price-on-card">Quantity:{ ProductList.product_quantity}</h5>
                    </div>
                </div>
                <hr/>
               </div>


        })

        return (
            <Fragment>


                  <ProductListLoader isLoading={this.state.isLoading}></ProductListLoader>

                           <div  className={this.state.MainDiv}>



                          <Container className="TopSection" fluid={true}>
                            <h4 className="section-title pt-5 pb-3 ">Your Cart Items</h4>
                            
                <Row className="">
                <Col md={7} lg={7} sm={12} xs={12} className="text-center">
                            {MyView}
                        </Col>
                        <Col md={5} lg={5} sm={12} xs={12}>
                            <div className="card p-2">
                                        <div className="card-body">
                                            <div className="container-fluid ">
                                                <div className="row">
                                                    <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                        <h5 className="Product-Name text-danger">Total Due: {totalPriceSum} TK</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Choose City</label>
                                                        <select onChange={this.cityOnChange}  className="form-control">
                                                            <option value="">Choose</option>
                                                            <option value="Dhaka">Dhaka</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Choose Payment Method</label>
                                                        <select onChange={this.paymentMethodOnChange} className="form-control">
                                                            <option value="">Choose</option>
                                                            <option value="Cash On Delivery">Cash On Delivery</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Name</label>
                                                        <input onChange={this.nameOnChange} className="form-control" type="text" placeholder=""/>
                                                    </div>

                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Delivery Address</label>
                                                        <textarea onChange={this.addressOnChange}  rows={2}  className="form-control" type="text" placeholder=""/>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <button onClick={this.confirmOnClick}  className="btn  site-btn">{this.state.confirmBtn}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </Col>
                
               
                </Row>
            </Container>
            <ToastContainer />
            {this.PageRefresh()}

            {this.PageRedirect()}
            </div>
                
            </Fragment>
        );
    }
}

export default Cart;