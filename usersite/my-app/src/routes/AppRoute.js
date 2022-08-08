import React, { Component,Fragment } from 'react';
import {Routes,Route, Redirect} from 'react-router-dom'

import HomePage from '../pages/HomePage';
import UserLoginPage from '../pages/UserLoginPage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import PurchasePage from '../pages/PurchasePage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import RefundPolicyPage from '../pages/RefundPolicyPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import NotificationPage from '../pages/NotificationPage';
import FavouritePage from '../pages/FavouritePage';
import CartPage from '../pages/CartPage';
import ProductListByCategory from '../pages/ProductListByCategory';
import ProductListBySubcategory from '../pages/ProductListBySubcategory';
import OrderPage from '../pages/OrderPage';
import SearchPage from '../pages/SearchPage';
import OptVerificationPage from '../pages/OptVerificationPage';






class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                 <Routes>
    
                     <Route  path="/" element={<HomePage/>} />
                     <Route  path="/login" element={<UserLoginPage/>}/>
                     <Route  path="/contact" element={<ContactPage/>}/>
                     <Route  path="/about" element={<AboutPage/>}/>
                     <Route  path="/purchase" element={<PurchasePage/>}/>
                     <Route  path="/policy" element={<PrivacyPolicyPage/>}/>
                     <Route  path="/refund" element={<RefundPolicyPage/>}/>
                     <Route  path="/productDetails/:subcategory/:code" element={<ProductDetailsPage/>}/>
                     <Route  path="/notification" element={<NotificationPage/>}/>
                     <Route  path="/favourite" element={<FavouritePage/>}/>
                     <Route  path="/cart" element={<CartPage/>}/>
                     <Route  path="/orderList" element={<OrderPage/>}/>
                     <Route  path="/productListByCategory/:category" element={<ProductListByCategory/>}/>
                     <Route  path="/productListBySubcategory/:category/:subcategory" element={<ProductListBySubcategory/>}/>
                     <Route  path="/ProductListBySearch/:searchKey/" element={<SearchPage/>}/>
                     <Route  path="/OptVerification/:mobileNo" element={<OptVerificationPage/>}/>


                 </Routes>
            </Fragment>
        );
    }
}

export default AppRoute;