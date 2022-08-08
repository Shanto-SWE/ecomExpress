<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productlist;
use App\Models\FavouriteItem;


class FavouriteController extends Controller
{
    public function AddToFavourite(Request $request){

     $code=$request->code;
     $mobile=$request->mobile;

     $product_details=Productlist::where('product_code',$code)->first();


     $count_item=FavouriteItem::where('mobile',$mobile)->where('product_code',$code)->count();


     if($count_item<=0){

        $result=FavouriteItem::insert([

            'product_name'=>$product_details->product_name,
            'subcategory'=>$product_details->subcategory,
            'product_image'=>$product_details->product_image,
            'product_code'=>$code,
            'mobile'=>$mobile
    
         ]);
         return 1;
     }else{
        return 0;

     }

   

    



    }

    public function FavouriteList(Request $request){

        $mobile=$request->mobile;
        $result=FavouriteItem::where('mobile',$mobile)->get();

        return $result;



    }
    public function removeFavItem(Request $request){

        $mobile=$request->mobile;
        $code=$request->code;
        $result=FavouriteItem::where('mobile',$mobile)->where('product_code',$code)->delete();

        return $result;



    }
}
