<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SiteInfoController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductlistController;
use App\Http\Controllers\Slidercontroller;
use App\Http\Controllers\ProductDetailsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\OrderController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// visitor details

Route::get('/getVisitorDetails',[VisitorController::class,'getVisitorDetails']);
// post contact
Route::post('/sendContactDetails',[ContactController::class,'sendContactDetails']);
// send site info
Route::get('/sendSiteInfo',[SiteInfoController::class,'sendSiteInfo']);
// send category details
Route::get('/sendCategoryDetails',[CategoryController::class,'sendCategoryDetails']);
// send productlistby remark
Route::get('/productListByRemark/{remark}',[ProductlistController::class,'productListByRemark']);
// send product by subcategories
Route::get('/productListBySubcategory/{category}/{subcategory}',[ProductlistController::class,'productListBySubcategory']);

// send product by category
Route::get('/productListByCategory/{category}',[ProductlistController::class,'productListByCategory']);
// send slider info
Route::get('/sendSliderInfo',[Slidercontroller::class,'sendSliderInfo']);

// product details
Route::get('/ProductDetails/{code}',[ProductDetailsController::class,'ProductDetails']);

// product list for details page
Route::get('/ProductList/{code}',[ProductDetailsController::class,'ProductList']);

// Notification details
Route::get('/NotificationHistory',[NotificationController::class,'NotificationHistory']);
Route::get('/NotificationHistoryCount',[NotificationController::class,'NotificationHistoryCount']);
Route::get('/NotificationHistoryRead',[NotificationController::class,'NotificationHistoryRead']);

// Search product
Route::get('/SearchByProduct/{searchKey}',[ProductlistController::class,'SearchByProduct']);

// Sms OTP 
Route::get('/createOtp/{mobile}',[LoginController::class,'createOtp']);
Route::post('/OtpVerification',[LoginController::class,'OtpVerification']);

// similar product
Route::get('/similarProduct/{subcategory}',[ProductDetailsController::class,'similarProduct']);
// review list
Route::get('/reviewList/{code}',[ReviewController::class,'reviewList']);
Route::post('/PostReview',[ReviewController::class,'PostReview']);

// add to cart
Route::post('/AddToCart',[CartController::class,'AddToCart']);
Route::get('/CartCount/{mobile}',[CartController::class,'CartCount']);
Route::get('/CartList/{mobile}',[CartController::class,'CartList']);
Route::get('/removeCartItem/{id}',[CartController::class,'removeCartItem']);
Route::get('/CartItemPlus/{id}/{quantity}/{price}',[CartController::class,'CartItemPlus']);
Route::get('/CartItemMinus/{id}/{quantity}/{price}',[CartController::class,'CartItemMinus']);
// add to favourite
Route::get('/AddToFavourite/{code}/{mobile}',[FavouriteController::class,'AddToFavourite']);
Route::get('/FavouriteList/{mobile}',[FavouriteController::class,'FavouriteList']);
Route::get('/removeFavItem/{code}/{mobile}',[FavouriteController::class,'removeFavItem']);

// order
Route::post('/CartOrder',[OrderController::class,'CartOrder']);
Route::get('/orderList/{mobile}',[OrderController::class,'orderList']);
