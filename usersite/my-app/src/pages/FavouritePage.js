import React, { Component ,Fragment} from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenumobile from '../components/common/NavMenumobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Favourite from '../components/Favourite/Favourite';
import LocalStorageHelper from '../LocalStorageHelper/LocalStorageHelper';
import { Navigate } from "react-router-dom";

class FavouritePage extends Component {
  
    constructor() {
        super();
        this.state={
            RedirectStatus:false,
        }
    }

    pageRedirect=()=>{
        if(this.state.RedirectStatus===true){
            return(
                <Navigate to="/login"/>
            )
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        let mobile= LocalStorageHelper.getUserMobile();
        if(mobile===null){
            this.setState({RedirectStatus:true})
        }
    }

    render() {
        return (
            <Fragment>
            <div className="Desktop">

<NavMenuDesktop></NavMenuDesktop>

</div>
<div className="Mobile">
<NavMenumobile></NavMenumobile>


</div>
<Favourite></Favourite>

<div className="Desktop">

<FooterDesktop></FooterDesktop>
</div>
<div className="Mobile">
<FooterMobile></FooterMobile>

</div>
                  {this.pageRedirect()}
     </Fragment>
        );
    }
}

export default FavouritePage;