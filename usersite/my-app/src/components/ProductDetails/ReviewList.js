import React, { Component,Fragment } from 'react';
import axios from 'axios';
import ApiUrl from '../../api/ApiUrl';

class ReviewList extends Component {

  

   

    render() {


           let MyList=this.props.ReviewData;
        

        if(MyList.length>0){

            const MyView=MyList.map((list,i)=>{

                if(list.rating==="1"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-warning">
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.comments}</p>
                    </div>
                }
                else if(list.rating==="2"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-warning">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.comments}</p>
                    </div>
                }
                else if(list.rating==="3"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-warning">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.comments}</p>
                    </div>
                }
                else if(list.rating==="4"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-warning">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.comments}</p>
                    </div>
                }
                else if(list.rating==="5"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-warning">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.comments}</p>
                    </div>
                }
                });
            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    {MyView}
                </div>
            );
        }
        else {
            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    <p>................</p>
                </div>
            );
        }
    }
}

export default ReviewList;