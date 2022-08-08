import React, { Component ,Fragment,useEffect} from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenumobile from '../components/common/NavMenumobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import OtpVerification from '../components/common/OtpVerification';
import { useParams } from 'react-router-dom';

const OptVerificationPage = () => {

    useEffect(() => {
        window.scroll(0,0);
     }, []);

     const { mobileNo } = useParams();
    return (
        <Fragment>
            <div className="Desktop">

<NavMenuDesktop></NavMenuDesktop>

</div>
<div className="Mobile">
<NavMenumobile></NavMenumobile>


</div>
<OtpVerification mobileNo={mobileNo}></OtpVerification>


<div className="Desktop">

<FooterDesktop></FooterDesktop>
</div>
<div className="Mobile">
<FooterMobile></FooterMobile>

</div>
         
     </Fragment>
    );
};

export default OptVerificationPage;