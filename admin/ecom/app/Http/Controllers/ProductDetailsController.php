<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productlist;
use App\Models\ProductDetails;

class ProductDetailsController extends Controller
{
    public function ProductDetails(Request $request){

       $code=$request->code;

       $productdetails=ProductDetails::where('product_code',$code)->first();


 
  
       return $productdetails;

    }
    public function ProductList(Request $request){

        $code=$request->code;
        $productlist=Productlist::where('product_code',$code)->first();
   
        return $productlist;
 
     }

     public function similarProduct(Request $request){

      $subcategory=$request->subcategory;
      $productlist=Productlist::where('subcategory',$subcategory)->orderBy('id', 'desc')->take(12)->get();
 
      return $productlist;


     }


}
