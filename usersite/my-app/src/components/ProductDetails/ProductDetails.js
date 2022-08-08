import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card,Form,Button,Breadcrumb} from 'react-bootstrap';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import ProductDetailsPlaceholder from '../placeholder/ProductDetailsPlaceholder';
import SuggestedProducts from '../ProductDetails/SuggestedProducts';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import parse from 'html-react-parser';
import ReactDom from 'react-dom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ReviewList from './ReviewList';
import LocalStorageHelper from '../../LocalStorageHelper/LocalStorageHelper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

class ProductDetails extends Component {

    constructor(){

        super();
        this.state={
            productDetails:[],
            productList:[],
            isLoading:'',
            mainDiv:'d-none',
            color:"",
            size:"",
            quantity:"",
            isSize:null,
            isColor:null,
            previewImg:"0",
            ReviewData:[],
            similarProduct:[],
            addToCart:"Add To Cart",
            PageRefreshStatus:false,
            addToFav:"Favourite",
            PageRedirectStatus:false,
            orderNow:"Order Now",
        
      
        }

    }

    componentDidMount(){
        window.scroll(0,0);
     
        axios.get(ApiUrl.ProductDetails(this.props.code)).then(response=>{
   
            if(response.status==200){
                let data=response.data;
        
      
                this.setState({productDetails:data,isLoading:'d-none',mainDiv:''});
               }else{

                   toast.error('Something went wrong! try again',{

                       theme: "colored",
                       position:"bottom-center"
                   });
               }
           
         }).catch(error=>{
            
 
         })
         
        axios.get(ApiUrl.ProductList(this.props.code)).then(response=>{
   
            if(response.status==200){
                let data=response.data;
        
      
                this.setState({productList:data,previewImg:data.product_image,isLoading:'d-none',mainDiv:''});
               }else{

                   toast.error('Something went wrong! try again',{

                       theme: "colored",
                       position:"bottom-center"
                   });
               }
           
         }).catch(error=>{
            
 
         })
         
        //  review list data get

        axios.get(ApiUrl.reviewList(this.props.code)).then((res)=>{

         
            this.setState({ReviewData:res.data})
        })

        // similar product get
        axios.get(ApiUrl.similarProduct(this.props.subcategory)).then((res)=>{

         
            this.setState({similarProduct:res.data})
        })

        }

        imgOnclick=(event)=>{
            let imgSrc= event.target.getAttribute('src');
            this.setState({previewImg:imgSrc})
        }
        PriceOption(discount_price,price){
            if(discount_price==="0"){
                return(
                    <p className="product-price-on-card">Price: { price}TK</p>
                )
            }
            else{
                return(
                    <p className="product-price-on-card">
                        Price: <strike class="text-secondary">{ price}TK</strike>  { discount_price} TK
                    </p>
                )
            }
      
        }
        addToCart=()=>{
        
        
            if(LocalStorageHelper.getUserMobile()!==null){
          
                let isSize= this.state.isSize;
                let isColor= this.state.isColor;
                let productCode=this.props.code;
                let color=this.state.color;
                let size=this.state.size;
                let quantity=this.state.quantity;
                let Mobile=LocalStorageHelper.getUserMobile();
         
             
             


               
                if(isColor==="YES" && color.length===0){
                    toast.error('Please Select Color',{

                        theme: "colored",
                        position:"bottom-center"
                    });
                }
                else if(isSize==="YES" && size.length===0){
                    toast.error('Please Select Size',{

                        theme: "colored",
                        position:"bottom-center"
                    });
                }
                else if(quantity.length===0){
                    toast.error('Please Select Quantity',{

                        theme: "colored",
                        position:"bottom-center"
                    });
                }
              
                else {
                    this.setState({addToCart:"Adding.."})
                    let MyFormData=new FormData();
                    MyFormData.append("color",color);
                    MyFormData.append("size",size);
                    MyFormData.append("quantity",quantity);
                    MyFormData.append("mobile",Mobile);
                    MyFormData.append("product_code",productCode);
                    axios.post(ApiUrl.AddToCart,MyFormData).then((res)=>{
                        if(res.data===1){
                            toast.success('Item Added',{

                                theme: "colored",
                                position:"bottom-center"
                            });
                            this.setState({PageRefreshStatus:true})
                            this.setState({addToCart:"Add To Cart"})
                        }
                        else if(res.data===0){
                            toast.error('Item Already Added',{

                                theme: "colored",
                                position:"bottom-center"
                            });
                            this.setState({addToCart:"Add To Cart"})

                        }
                      
                        else {
                            toast.error('Request Fail ! Try Again',{

                                theme: "colored",
                                position:"bottom-center"
                            });
                            this.setState({addToCart:"Add To Cart"})
                        }
                    }).catch((err)=>{
                        toast.error('Request Faild ! Try Again',{

                            theme: "colored",
                            position:"bottom-center"
                        });
                        this.setState({addToCart:"Add To Cart"})
                    })
                }
            }
            else {
                let winlocation=window.location.pathname;
                LocalStorageHelper.SetRedirectFromDetails(winlocation);
                this.setState({RedirectToLogin:true})
            }
         
         }
         
         addToFav=()=>{
            
            if(LocalStorageHelper.getUserMobile()!==null){
                this.setState({addToFav:"Adding..."})
                let productCode=this.props.code;
                let Mobile=LocalStorageHelper.getUserMobile();
                axios.get(ApiUrl.AddToFavourite(productCode,Mobile)).then((res)=>{
                 
                 

                    if(res.data===1){
                        toast.success('Item Added',{

                            theme: "colored",
                            position:"bottom-center"
                        });
                        this.setState({addToFav:"Favourite"})
                    }
                    else if(res.data===0){
                        toast.error('Item Already Added',{

                            theme: "colored",
                            position:"bottom-center"
                        });
                        this.setState({addToFav:"Favourite"})

                    }
                    else {
                        toast.error('Request Fail ! Try Again',{

                            theme: "colored",
                            position:"bottom-center"
                        });
                        this.setState({addToFav:"Favourite"})
                    }
    
                }).catch((err)=> {
                    toast.error('Request Fail ! Try Again',{

                        theme: "colored",
                        position:"bottom-center"
                    });
                    this.setState({addToFav:"Favourite"})
                })
            }
            else {
                let winlocation=window.location.pathname;
                LocalStorageHelper.SetRedirectFromDetails(winlocation);
                this.setState({RedirectToLogin:true})
            }
    
        }
    

        orderNow=()=>{
            if(LocalStorageHelper.getUserMobile()!==null){
                let isSize= this.state.isSize;
                let isColor= this.state.isColor;
                let productCode=this.props.code;
                let color=this.state.color;
                let size=this.state.size;
                let quantity=this.state.quantity;
                let Mobile=LocalStorageHelper.getUserMobile();

                if(isColor==="YES" && color.length===0){
                    toast.error('Please Select Color',{

                        theme: "colored",
                        position:"bottom-center"
                    });
                }
                else if(isSize==="YES" && size.length===0){
                    toast.error('Please Select Size',{

                        theme: "colored",
                        position:"bottom-center"
                    });
                }
                else if(quantity.length===0){
                    toast.error('Please Select Quantity',{

                        theme: "colored",
                        position:"bottom-center"
                    });
                }
                else {
                    this.setState({orderNow:"Processing.."})
                   let MyFormData=new FormData();
                    MyFormData.append("color",color);
                    MyFormData.append("size",size);
                    MyFormData.append("quantity",quantity);
                    MyFormData.append("mobile",Mobile);
                    MyFormData.append("product_code",productCode);
                    axios.post(ApiUrl.AddToCart,MyFormData).then((res)=>{
                        if(res.data===1){
                           
                            this.setState({PageRedirectStatus:true})
                            this.setState({orderNow:"Order Now"})
                        }
                        else if(res.data===0){
                            toast.error('Item Already Added',{

                                theme: "colored",
                                position:"bottom-center"
                            });
                            this.setState({orderNow:"Order Now"})

                        }
                      
                        else {
                            toast.error('Request Fail ! Try Again',{

                                theme: "colored",
                                position:"bottom-center"
                            });
                            this.setState({orderNow:"Order Now"})
                        }
                    }).catch((err)=>{
                        toast.error('Request Faild ! Try Again',{

                            theme: "colored",
                            position:"bottom-center"
                        });
                        this.setState({orderNow:"Order Now"})
                    })
                }
            }
           else {
                let winlocation=window.location.pathname;
                LocalStorageHelper.SetRedirectFromDetails(winlocation);
                   this.setState({RedirectToLogin:true})
               }
           }
    colorOnChange=(e)=>{
        let color= e.target.value;
        this.setState({color:color})
     }
 
     sizeOnChange=(e)=>{
         let size= e.target.value;
         this.setState({size:size})
     }
 
     quantityOnChange=(e)=>{
         let quantity= e.target.value;
         this.setState({ quantity:quantity})
     }
            
     PageRefresh=(e)=>{
        if(this.state.PageRefreshStatus===true){
  
            window.location.reload(false);
           
            // let URL=window.location.pathname;
       
            // return(
            //        <Navigate to={URL}/>
            //  )
        }
    }
    PageRedirect=()=>{
        if(this.state.PageRedirectStatus===true){
            return(
                <Navigate to="/cart"/>
            )
        }
    }
    PageRedirectToLogin=()=>{
        if(this.state.RedirectToLogin===true){
            return <Navigate to="/login"/>
        }
    }
        
    render() {

        const productDetails=this.state.productDetails;
        const ProductList=this.state.productList;
        console.log(ProductList);
        let discount_price=ProductList.discount_price;
        let price=ProductList.price;

        let Des=productDetails.des;
        let Details=productDetails.details;
   

        let color=productDetails.color;

       
   
        let size=productDetails.size;
   
        var ColorDiv="d-none"
        if(color!=="NA"){
            this.setState({isColor:"YES"})
           let ColorArray= typeof color==="string" ? color.split(',') : "";
     
       
            var ColorOption=Array.isArray(ColorArray) ? ColorArray.map((ColorList,i)=>{
                return <option value={ColorList}>{ColorList}</option>
            }): [];
            ColorDiv=""
        }
        else{
            ColorDiv="d-none";
            this.setState({isColor:"NO"});
        }
      
        var SizeDiv="d-none"
        if(size!=="NA"){
            let SizeArray =typeof size==="string" ?  size.split(','): "";
            var  SizeOption=Array.isArray(SizeArray) ? SizeArray.map((SizeList,i)=>{
                return <option value={SizeList}>{SizeList}</option>
            }): "";
            SizeDiv=""
        }
        else{
            SizeDiv="d-none"
        }

        if(this.state.isSize===null){
            if(size!=="NA"){
                this.setState({isSize:"YES"})
            }
            else{
                this.setState({isSize:"NO"})
            }
        }

        
   
        return (
            <Fragment>
            
        <ProductDetailsPlaceholder isLoading={this.state.isLoading}></ProductDetailsPlaceholder>

            <div className={this.state.mainDiv}>

        
            <Container fluid={true}  className="TopSection  animated slideInDown">
                <Row>
                    <Breadcrumb className="shadow-sm w-100 bg-white">
               
                    </Breadcrumb>
                </Row>
                <Row className="p-0">
                    <Col  md={12} lg={12} sm={12} xs={12}>
                        <Row className=" shadow-sm  bg-white">
                            <Col className="p-3 animated " md={6} lg={6} sm={12} xs={12}>
                         

                            <InnerImageZoom 
                            className="w-100  img-fluid" id="previewImg"
                            zoomScale={.2}
                            zoomType={'hover'}
                          
                            
                            src={this.state.previewImg}  zoomSrc={this.state.previewImg}  />

                                    
                                
                                        <Row className='multiImage_div'>
                                            <Col className="p-0 multi_image m-0"  md={3} lg={3} sm={3} xs={3}>
                                                <img  onClick={this.imgOnclick} className="w-100 Product-sm-img img-fluid" src={productDetails.img1}  alt=""/>
                                            </Col>
                                            <Col className="p-0 multi_image m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img  onClick={this.imgOnclick} className="w-100 Product-sm-img img-fluid" src={productDetails.img2}  alt=""/>
                                            </Col>
                                            <Col className="p-0 multi_image m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img  onClick={this.imgOnclick} className="w-100 Product-sm-img img-fluid" src={productDetails.img3}  alt=""/>
                                            </Col>
                                            <Col className="p-0 multi_image m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img  onClick={this.imgOnclick} className="w-100 Product-sm-img img-fluid" src={productDetails.img4}  alt=""/>
                                            </Col>
                                        </Row>
                                 
                                </Col>
                            <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                                    <h5 className="Product-Name">{ProductList.product_name}</h5>
                                    <h6 className="section-sub-title"> 
                                    <div dangerouslySetInnerHTML={{ __html: Des }} />
                                       </h6>
                               
                                       {this.PriceOption(discount_price,price)}
                                    <div  className={ColorDiv}>
                                        <h6 className="mt-2">Choose Color</h6>
                                        <select onChange={this.colorOnChange}  className="form-control form-select">
                                            <option value="">Choose Color</option>
                                     {ColorOption}
                                        </select>
                                    </div>

                                    <div className={SizeDiv}>
                                        <h6 className="mt-2">Choose Size</h6>
                                        <select  onChange={this.sizeOnChange} className="form-control form-select">
                                            <option value="">Choose Size</option>
                                           {SizeOption}
                                        </select>
                                    </div>
                                    <div className="">
                                        <h6 className="mt-2">Choose Quantity</h6>
                                        <select onChange={this.quantityOnChange} className="form-control form-select">
                                            <option value="">Choose Quantity</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div className="input-group mt-3">
                                        <button className="btn site-btn m-1"   onClick={this.addToCart} ><i className="fa fa-shopping-cart"/> {this.state.addToCart} </button>
                                        <button  onClick={this.orderNow} className="btn btn-primary m-1"><i className="fa fa-car"/>{this.state.orderNow} </button>
                                        <button onClick={this.addToFav} className="btn btn-primary m-1"><i className="fa fa-heart"/> {this.state.addToFav}</button>
                                    </div>
                                </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className="p-1" md={6} lg={6} sm={12} xs={12}>
                        <div className="shadow-sm p-3 bg-white">
                            <h6 className="mt-2">DETAILS</h6>
                            <div dangerouslySetInnerHTML={{ __html: Details }} />
                        </div>
                    </Col>
                    <Col className="p-1" md={6} lg={6} sm={12} xs={12}>
                        <div className="shadow-sm p-3 bg-white">
                        <ReviewList ReviewData={this.state.ReviewData} />
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
            <SuggestedProducts similarProduct={this.state.similarProduct}/>
            {this.PageRefresh()}
            {this.PageRedirect()}
            {this.PageRedirectToLogin()}
                    
            </div>
           
        </Fragment>
        );
    }
}

export default ProductDetails;