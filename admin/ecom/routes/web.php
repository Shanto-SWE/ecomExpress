<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/






Route::namespace('App\Http\Controllers\Admin')->group(function(){

    // homepage
    Route::get('/', 'HomeController@HomePage')->middleware('loginCheck');
    Route::get('/HomeSummary', 'HomeController@HomeSummary')->middleware('loginCheck');

   // admin login
    Route::get('SignIn','AdminController@SignIn')->name('admin.login');
    Route::post('OnSignIn','AdminController@OnSignIn');
    Route::get('OnLogOut','AdminController@OnLogOut');

    // vister
    Route::get('VisitorListPage','VisiterListController@VisitorListPage')->middleware('loginCheck');
    Route::get('VisitorListData','VisiterListController@VisitorListData')->middleware('loginCheck');

    // Notification

    Route::get('NotificationListPage','NotificationController@NotificationListPage')->middleware('loginCheck');
    Route::get('NotificationListData','NotificationController@NotificationListData')->middleware('loginCheck');
    Route::post('CreateNotification','NotificationController@CreateNotification')->middleware('loginCheck');
    
    // contact
    Route::get('ContactListPage','ContactController@ContactListPage')->middleware('loginCheck');
    Route::get('ContactListData','ContactController@ContactListData')->middleware('loginCheck');
    Route::post('ContactListDelete','ContactController@ContactListDelete')->middleware('loginCheck');

    // adminlist

    Route::get('AdminListPage','AdminController@AdminListPage')->middleware('loginCheck');
    Route::get('AdminListData','AdminController@AdminListData')->middleware('loginCheck');
    Route::post('AdminAdd','AdminController@AdminAdd')->middleware('loginCheck');
    Route::post('AdminListDelete','AdminController@AdminListDelete')->middleware('loginCheck');

    // others
    Route::get('AboutPage','SiteInfoController@AboutPage')->middleware('loginCheck');
    Route::get('TermsPage','SiteInfoController@TermsPage')->middleware('loginCheck');
    Route::get('PolicyPage','SiteInfoController@PolicyPage')->middleware('loginCheck');
    Route::get('PurchasePage','SiteInfoController@PurchasePage')->middleware('loginCheck');
    Route::get('AddressPage','SiteInfoController@AddressPage')->middleware('loginCheck');
    Route::get('AboutCompanyPage','SiteInfoController@AboutCompanyPage')->middleware('loginCheck');

    Route::get('MobileAppPage','SiteInfoController@MobileAppPage')->middleware('loginCheck');
    Route::get('SocialPage','SiteInfoController@SocialPage')->middleware('loginCheck');

    Route::get('GetSiteInfoDetails','SiteInfoController@GetSiteInfoDetails')->middleware('loginCheck');
    Route::post('UpdateSiteInfo','SiteInfoController@UpdateSiteInfo')->middleware('loginCheck');

    // site seo

    Route::get('siteSEO','SeoController@siteSEO')->middleware('loginCheck');
    Route::get('GetSEODetails','SeoController@GetSEODetails')->middleware('loginCheck');
    Route::post('UpdateSEODetails','SeoController@UpdateSEODetails')->middleware('loginCheck');
    Route::post('ChangeSEOIMG','SeoController@ChangeSEOIMG')->middleware('loginCheck');

    // otp list
    Route::get('OtpListPage','OTPListController@OtpListPage')->middleware('loginCheck');
    Route::get('OtpListData','OTPListController@OtpListData')->middleware('loginCheck');

    // category

    Route::get('CategoryListPage','CategoryController@CategoryListPage')->middleware('loginCheck');
    Route::get('CategoryListData','CategoryController@CategoryListData')->middleware('loginCheck');
    Route::post('CategoryAdd','CategoryController@CategoryAdd')->middleware('loginCheck');
    Route::post('CategoryDelete','CategoryController@CategoryDelete')->middleware('loginCheck');
    Route::post('ChangeCategoryImage','CategoryController@ChangeCategoryImage')->middleware('loginCheck');
    Route::post('GetCategoryName','CategoryController@GetCategoryName')->middleware('loginCheck');
    Route::post('CategoryNameEdit','CategoryController@CategoryNameEdit')->middleware('loginCheck');

    // subcategory
    
    Route::get('SubCategoryListPage','SubcategoryController@SubCategoryListPage')->middleware('loginCheck');
    Route::get('SubCategoryListData','SubcategoryController@SubCategoryListData')->middleware('loginCheck');
    Route::post('SubCategoryAdd','SubcategoryController@SubCategoryAdd')->middleware('loginCheck');
    Route::post('SubCategoryDelete','SubcategoryController@SubCategoryDelete')->middleware('loginCheck');
    Route::post('GetSubCategoryEditData','SubcategoryController@GetSubCategoryEditData')->middleware('loginCheck');
    Route::post('SubCategoryNameEdit','SubcategoryController@SubCategoryListPage')->middleware('loginCheck');

    // brand

    Route::get('BrandListPage','BrandController@BrandListPage')->middleware('loginCheck');
    Route::get('BrandListData','BrandController@BrandListData')->middleware('loginCheck');
    Route::post('BrandAdd','BrandController@BrandAdd')->middleware('loginCheck');
    Route::post('BrandDelete','BrandController@BrandDelete')->middleware('loginCheck');
    Route::post('ChangeBrandImage','BrandController@ChangeBrandImage')->middleware('loginCheck');

    // product list
    Route::get('ProductListPage','ProductListController@ProductListPage')->middleware('loginCheck');
    Route::get('ProductListData','ProductListController@ProductListData')->middleware('loginCheck');
    Route::get('GetCategoryList','ProductListController@GetCategoryList')->middleware('loginCheck');
    Route::post('GetSubCategoryAsCategory','ProductListController@GetSubCategoryAsCategory')->middleware('loginCheck');
    Route::post('ProductListAdd','ProductListController@ProductListAdd')->middleware('loginCheck');
    Route::post('ProductListDelete','ProductListController@ProductListDelete')->middleware('loginCheck');
    Route::post('ChangeProductListImage','ProductListController@ChangeProductListImage')->middleware('loginCheck');
    Route::post('ProductListEditData','ProductListController@ProductListEditData')->middleware('loginCheck');
    Route::post('ProductListDataEdit','ProductListController@ProductListDataEdit')->middleware('loginCheck');

    // product details 
    Route::get('ProductDetailsPage','ProductDetailsController@ProductDetailsPage')->middleware('loginCheck');
    Route::get('ProductDetailsData','ProductDetailsController@ProductDetailsData')->middleware('loginCheck');
    Route::get('GetProductCode','ProductDetailsController@GetProductCode')->middleware('loginCheck');
    Route::post('ProductDetailsAdd','ProductDetailsController@ProductDetailsAdd')->middleware('loginCheck');
    Route::post('ProductDetailsWithOneImg','ProductDetailsController@ProductDetailsWithOneImg')->middleware('loginCheck');
    Route::post('ProductDetailsWithTwoImg','ProductDetailsController@ProductDetailsWithTwoImg')->middleware('loginCheck');
    Route::post('ProductDetailsWithThreeImg','ProductDetailsController@ProductDetailsWithThreeImg')->middleware('loginCheck');
    Route::post('ProductDetailsDelete','ProductDetailsController@ProductDetailsDelete')->middleware('loginCheck');
    Route::post('ProductDetailsEditData','ProductDetailsController@ProductDetailsEditData')->middleware('loginCheck');
    Route::post('ProductDetailsDataEdit','ProductDetailsController@ProductDetailsDataEdit')->middleware('loginCheck');
    Route::post('ProductImageEditData','ProductDetailsController@ProductImageEditData')->middleware('loginCheck');
    Route::post('ChangeProductImageOne','ProductDetailsController@ChangeProductImageOne')->middleware('loginCheck');
    Route::post('ChangeProductImageTwo','ProductDetailsController@ChangeProductImageTwo')->middleware('loginCheck');
    Route::post('ChangeProductImageThree','ProductDetailsController@ChangeProductImageThree')->middleware('loginCheck');
    Route::post('ChangeProductImageFour','ProductDetailsController@ChangeProductImageFour')->middleware('loginCheck');

    // slider
    Route::get('SliderListPage','SliderController@SliderListPage')->middleware('loginCheck');
    Route::get('SliderListData','SliderController@SliderListData')->middleware('loginCheck');
    Route::get('Slider/GetProductCode','SliderController@GetProductCode')->middleware('loginCheck');
    Route::post('SliderAdd','SliderController@SliderAdd')->middleware('loginCheck');
    Route::post('SliderDelete','SliderController@SliderDelete')->middleware('loginCheck');
    Route::post('ChangeSliderImage','SliderController@SliderListPage')->middleware('loginCheck');
    Route::post('SliderListEditData','SliderController@SliderListEditData')->middleware('loginCheck');
    Route::post('SliderDataEdit','SliderController@SliderDataEdit')->middleware('loginCheck');

    // product order
    Route::get('ProductOrderPage','OrderController@ProductOrderPage')->middleware('loginCheck');
    Route::get('ProductOrderData','OrderController@ProductOrderData')->middleware('loginCheck');
    Route::post('ProductOrderDetailsData','OrderController@ProductOrderDetailsData')->middleware('loginCheck');
    Route::post('ProductOrderDelete','OrderController@ProductOrderDelete')->middleware('loginCheck');
    Route::post('ProductOrderStatusEdit','OrderController@ProductOrderStatusEdit')->middleware('loginCheck');
    Route::post('ProductOrderInvoiceData','OrderController@ProductOrderInvoiceData')->middleware('loginCheck');

    // product review
    Route::get('ProductReviewPage','ReviewController@ProductReviewPage')->middleware('loginCheck');
    Route::get('ProductReviewData','ReviewController@ProductReviewData')->middleware('loginCheck');
    Route::post('ProductReviewDelete','ReviewController@ProductReviewDelete')->middleware('loginCheck');

});