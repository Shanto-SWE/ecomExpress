import React, { Component,Fragment,useState } from 'react';
import {Link} from 'react-router-dom'


class MegaMenu extends Component {


    MenuItemClick=(event)=>{
        event.target.classList.toggle("active");
        let panel=event.target.nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
        }
        else{
            panel.style.maxHeight=panel.scrollHeight+ "px"
        }
    }


  
    render() {

        const myList=this.props.data
        const MyView=myList.map((category,i)=>{
            return <div key={i.toString()}>
                <button onClick={this.MenuItemClick} className="accordion"> <img alt="" className="accordionMenuIcon" src=""/>  {category.category_name}</button>
                <div className="panel">
                <ul>
                {
                            (category.subcategory).map((subcategory,i)=>{
                                return  <li key={i.toString()}>
                                    <Link to={"/productListBySubcategory/"+subcategory.category_name+"/"+subcategory.subcategory_name} className="accordionItem">{subcategory.subcategory_name}</Link>
                                </li>
                            })
                        }

              </ul>
                </div>
            </div>
        })

        return (
            <Fragment>
            <div className="accordionMenuDiv">
         

              <div className="accordionMenuDivInside">
              


            {MyView}
              
         
            
            </div>


                
            </div>
            </Fragment>
        );
    }
}

export default MegaMenu;