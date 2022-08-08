import React, {Component,Fragment} from 'react';
import {Modal, Container, Row, Col, Breadcrumb,Button} from "react-bootstrap";
import axios from 'axios';
import ApiUrl from '../../api/ApiUrl';
import DescriptionPlaceholder from '../placeholder/DescriptionPlaceholder';

class Notification extends Component {

    constructor(){

        super();
        this.state={

            NotificationModal:false,
            notificationData:[],
            NotificationDate:"",
            NotificationTitle:"",
            NotificationMsg:"",
            isLoading:'',
            mainDiv:'d-none'
        }
    }

    componentDidMount(){

     
        axios.get(ApiUrl.NotificationHistory).then(response=>{
   
            if(response.status==200){
                let data=response.data;
     
      
                this.setState({notificationData:data,isLoading:'d-none',mainDiv:''});
               }else{

                   toast.error('Something went wrong! try again',{

                       theme: "colored",
                       position:"bottom-center"
                   });
               }
           
         }).catch(error=>{
            
 
         })
   


}
    handleClose = () =>{
        this.setState({NotificationModal:false});


    }
   handleShow = (event) => {

    this.setState({NotificationModal:true});

    let Ndate= event.target.getAttribute('data-date');
    let Nmsg= event.target.getAttribute('data-msg');
    let Ntitle= event.target.getAttribute('data-title');
    this.setState({NotificationDate:Ndate,NotificationMsg:Nmsg,NotificationTitle:Ntitle})


    }
    render() {

        const notification=this.state.notificationData;
        const MyView=notification.map((notification,i)=>{

            return(

                <>

                   <Col className=" d-flex justify-content-around mt-1" md={12} lg={12} sm={12} xs={12}>
                        <div className="float-left w-75">
                            <h6 className="notification-title">{notification.title} </h6>
                            <p className="py-1  px-0 notification-date m-0"><i className="fa  fa-bell"/> {notification.date}</p>
                        </div>
                        <div className="float-right px-2 w-25">
                            <button data-msg={notification.msg} data-date={notification.date} data-title={notification.title}  className="btn btn-sm site-btn" onClick={this.handleShow}>Details</button>
                        </div>
                    </Col>
                    <hr className="bg-light w-100"/>
                </>
            )



        })


        return (
            <Fragment>
        


            <Container  className={this.state.isLoading+" TopSection pt-5"}>
                <Row  className="d-flex justify-content-center">
                    <Col  md={10} lg={10} sm={12} xs={12}>
                        <Container>
                        <DescriptionPlaceholder isLoading={this.state.isLoading}/>
                        </Container>
                    </Col>
                </Row>
            </Container>

           <div className={this.state.mainDiv}>
           <Container fluid={true} className=" TopSection pt-5">


                <Row  className="d-flex justify-content-center">
                    <Col  md={10} lg={10}  sm={12} xs={12}>
                    {/* <Breadcrumb className="shadow-sm mt-2 bg-white">
                                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item><Link to="/notification">Notification</Link></Breadcrumb.Item>
                                </Breadcrumb> */}
                    <Container className="mt-1">
                        <Row className="shadow-sm animated slideInDown bg-white p-4">
                        
                    {MyView}
                    
                        </Row>
                    </Container>
                </Col>


                </Row>
           </Container>

           </div>

            <Modal show={this.state.NotificationModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><i className="fa  fa-bell"/> Date: {this.state.NotificationDate} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h6 className="notification-title">{this.state.NotificationTitle}</h6>
                           
         <p>{this.state.NotificationMsg}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
            
        </Fragment>
        );
    }
}

export default Notification;