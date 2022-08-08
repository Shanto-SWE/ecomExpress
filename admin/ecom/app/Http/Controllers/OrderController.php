<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\ProductCart;



class OrderController extends Controller
{
    public function CartOrder(Request $request){
      
        $city=$request->input('city');
        $paymentMethod=$request->input('paymentMethod');
        $yourName=$request->input('yourName');
        $deliveryAddress=$request->input('deliveryAddress');
        $mobileNumber=$request->input('mobileNumber');
        $invoice_no=$request->input('invoice_no');
        $shippingCharge=$request->input('ShippingPrice');

        $order_time=date('h:i:sa');
        $order_date=date('d-m-Y');
        

        $cartlist=ProductCart::where('mobile',$mobileNumber)->get();

        foreach($cartlist as $cartlist){
            $cartInsetDeleteResult='';

          $resultinsert  =Order::insert([
                'invoice_no'=>"c".$invoice_no,
                'product_name'=>$cartlist['product_name'],
                'product_code'=>$cartlist['product_code'],
                'shop_name'=>$cartlist['shop_name'],
                'shop_code'=>$cartlist['shop_code'],
                'product_info'=>$cartlist['product_info'],
                'product_quantity'=>$cartlist['product_quantity'],
                'unit_price'=>$cartlist['unit_price'],
                'total_price'=>$cartlist['total_price'], 
                'mobile'=>$mobileNumber,
                'name'=>$yourName,
                'payment_method'=>$paymentMethod,
                'delivery_address'=>$deliveryAddress,
                'city'=>$city,
                'delivery_charge'=>$shippingCharge,
                'order_date'=>$order_date,
                'order_time'=>$order_time,
                'order_status'=>'pending',
               



            ]);

            if( $resultinsert ==1){

                $resultDelete=ProductCart::where('id',$cartlist['id'])->delete();
                if($resultDelete==1){

                  $cartInsetDeleteResult=1;
                }else{
                    $cartInsetDeleteResult=0;

                }

            }
        }

       return  $cartInsetDeleteResult;

    }

    public function orderList(Request $request){


        $mobile=$request->mobile;
        $result=Order::where('mobile',$mobile)->orderBy('id', 'DESC')->get();
        return $result;

    }
}
