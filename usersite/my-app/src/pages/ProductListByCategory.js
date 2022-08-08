
import React, { Component ,Fragment,useEffect } from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenumobile from '../components/common/NavMenumobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import LIstByCategory from '../components/ProductDetails/LIstByCategory';
import { useParams } from 'react-router-dom';


const productListByCategory = () => {


    useEffect(() => {
        window.scroll(0,0);
     }, []);


    const { category } = useParams();
    return (
        <Fragment>
        <div className="Desktop">

<NavMenuDesktop ></NavMenuDesktop>

</div>
<div className="Mobile">
<NavMenumobile></NavMenumobile>


</div>
<LIstByCategory category={category} ></LIstByCategory>


<div className="Desktop">

<FooterDesktop></FooterDesktop>
</div>
<div className="Mobile">
<FooterMobile></FooterMobile>

</div>
     
 </Fragment>
    );
};

export default productListByCategory;