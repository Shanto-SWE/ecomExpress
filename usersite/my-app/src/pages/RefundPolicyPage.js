import React, { Component,Fragment} from 'react';

import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenumobile from '../components/common/NavMenumobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import RefundPolicy from '../components/others/RefundPolicy';


class FefundPolicyPage extends Component {
    componentDidMount(){

        window.scroll(0,0)
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
<RefundPolicy></RefundPolicy>


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


export default FefundPolicyPage;