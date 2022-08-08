import React, { Component,Fragment } from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';
import ApiUrl from '../../api/ApiUrl';
import axios from 'axios';
import {Link} from "react-router-dom";
import CategoryPlaceholder from '../placeholder/CategoryPlaceholder';


class Categories extends Component {
    constructor(){

        super();
        this.state={
            menuData:[],
            isLoading:'',
            mainDiv:'d-none'
        }
    }

        componentDidMount(){

     
                axios.get(ApiUrl.sendCategoryDetails).then(response=>{
           
                    if(response.status==200){
                        let data=response.data;
              
                        this.setState({menuData:data,isLoading:'d-none',mainDiv:''});
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

        const myList=this.state.menuData
        const MyView=myList.map((category,i)=>{
            return      <Col  key={i.toString()} className="p-0" key={1} xl={2} lg={2} md={3} sm={6} xs={6}>

            <Link to={"/productListByCategory/"+category.category_name}>
            <Card className=" h-100 w-100 card ">
            
            <img className="category_image" src={category.category_image} alt="" />
           <Card.Body>

              
            <h5 className="category_name text-secondary">{category.category_name}</h5>
          
                      
            </Card.Body>
            </Card>  


</Link>
            </Col>     
 
        })

        return (
            <Fragment>

           <CategoryPlaceholder isLoading={this.state.isLoading}></CategoryPlaceholder>


          <div  className={this.state.mainDiv}>
            <Container className="text-center BetweenTwoSection categorySection mt-5" fluid={true}>
                            <h4 className="section-title">Categories</h4>
               
                            <h6 className="section-sub-title">Some Of Our Exclusive Category, You May Like</h6>
              
             <Row className="cargoires">

     
              {MyView}

        
            </Row>
           
               

                </Container>
            </div>
         
            </Fragment>
        );
    }
}

export default Categories;