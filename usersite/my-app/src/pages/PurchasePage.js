import React, { Component,Fragment} from 'react';

import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenumobile from '../components/common/NavMenumobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Purchase from '../components/others/Purchase';

class PurchasePage extends Component {
    
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
<Purchase></Purchase>


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

export default PurchasePage;