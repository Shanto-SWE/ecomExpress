import React, { Component ,Fragment,useEffect} from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenumobile from '../components/common/NavMenumobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import SuggestedProducts from '../components/ProductDetails/SuggestedProducts';
import { useParams } from 'react-router-dom';


const ProductDetailsPage = () => {

    useEffect(() => {
        window.scroll(0,0);
     }, []);
     const { code } = useParams();
     const { subcategory } = useParams()
    return (
        <Fragment>
        <div className="Desktop">

<NavMenuDesktop></NavMenuDesktop>

</div>
<div className="Mobile">
<NavMenumobile></NavMenumobile>


</div>
<ProductDetails code={code} subcategory={subcategory} ></ProductDetails>


<div className="Desktop">

<FooterDesktop></FooterDesktop>
</div>
<div className="Mobile">
<FooterMobile></FooterMobile>

</div>
     
 </Fragment>
    );
};

export default ProductDetailsPage;