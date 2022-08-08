<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCart;
use App\Models\Productlist;

class CartController extends Controller
{
    public function AddToCart(Request $request){

     $color=$request->input('color');
     $size=$request->input('size');
     $quantity=$request->input('quantity');
     $mobile=$request->input('mobile');
     $product_code=$request->input('product_code');

     $product_details=Productlist::where('product_code', $product_code)->first();
     $price=$product_details->price;
     $discount_price=$product_details->discount_price;

     if($discount_price=='0'){

        $total_price=$price*$quantity;
        $unit_price=$price;


     }else{
         
        $total_price=$discount_price*$quantity;
        $unit_price=$discount_price;
     }

     $count_item=ProductCart::where('mobile',$mobile)->where('product_code',$product_code)->count();

     if($count_item==0){

      $result= ProductCart::insert([
         'image'=>$product_details->product_image,
         'product_name'=>$product_details->product_name,
         'product_code'=>$product_code,
         'shop_name'=>'shanto shop',
         'shop_code'=>'123',
         'product_info'=>"color:".$color.","."size:".$size,
         'product_quantity'=>$quantity,
         'unit_price'=>$unit_price,
         'total_price'=>$total_price,
         'mobile'=>$mobile,
  
  
       ]);
  
       return  1;

     }else{

      return 0;
     }




    }

    public function CartCount(Request $request){

      $mobile=$request->mobile;
      $result=ProductCart::where('mobile',$mobile)->count();
      return $result;



    }

    public function CartList(Request $request){

      $mobile=$request->mobile;
      $result=ProductCart::where('mobile',$mobile)->get();

      return $result;



  }

  public function removeCartItem(Request $request){


   $id=$request->id;
   $result=ProductCart::where('id',$id)->delete();

   return $result;



}

public function CartItemPlus(Request $request){

   $id=$request->id;
   $quantity=$request->quantity;
   $price=$request->price;

   $newquantity=$quantity+1;

   $total_price=$newquantity*$price;

  $result= ProductCart::where('id',$id)->update(['product_quantity'=>$newquantity,'total_price'=>$total_price]);

  return $result;


}

public function CartItemMinus(Request $request){

   $id=$request->id;
   $quantity=$request->quantity;
   $price=$request->price;

  $newquantity=$quantity-1;

   if($newquantity=='0'){
      $result= ProductCart::where('id',$id)->delete();
      return $result;
   }
   
   $total_price=$newquantity*$price;


      $result= ProductCart::where('id',$id)->update(['product_quantity'=>$newquantity,'total_price'=>$total_price]);
      return $result;

   


 



}




}
