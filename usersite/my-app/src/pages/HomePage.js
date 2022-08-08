import React, { Component,Fragment} from 'react';
import FeaturedProducts from '../components/home/FeatureProducts';
import Categories  from '../components/home/Categories';
import Collection from '../components/home/Collection';
import NewArrival from '../components/home/NewArrival';
import HomeTop from '../components/home/HomeTop';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenumobile from '../components/common/NavMenumobile';
import HomeTopMobile from '../components/home/HomeTopMobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import ApiUrl from '../api/ApiUrl';
import axios from 'axios';

class HomePage extends Component {

    componentDidMount(){

        window.scroll(0,0);
        // this.getVisitorDetails();
    }

    getVisitorDetails=()=>{

       axios.get(ApiUrl.getVisitorDetails).then().catch();
    }
    render() {
        return (
            <Fragment>
            <div className="Desktop">

            <NavMenuDesktop></NavMenuDesktop>
             <HomeTop></HomeTop>
            </div>
            <div className="Mobile">
            <NavMenumobile></NavMenumobile>
             <HomeTopMobile></HomeTopMobile>

           </div>

             



             <Categories></Categories>
             <FeaturedProducts></FeaturedProducts>
             <NewArrival></NewArrival>
              <Collection></Collection>

             
           <div className="Desktop">

           <FooterDesktop></FooterDesktop>
            </div>
            <div className="Mobile">
            <FooterMobile></FooterMobile>

           </div>
           
            </Fragment>
        );
    }
}

export default HomePage;