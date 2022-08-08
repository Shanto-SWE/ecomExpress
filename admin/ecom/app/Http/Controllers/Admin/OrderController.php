<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Exception;
use Twilio\Rest\Client;

class OrderController extends Controller
{
    function ProductOrderPage(){
        return view('Order.ProductOrder');
    }

    function ProductOrderData(){
        $result=Order::
            select('invoice_no','total_price','mobile','name','payment_method','delivery_address','city','delivery_charge','order_date','order_time','order_status')
   
            ->orderBy('id','desc')
            ->get();
        return $result;
    }
    function ProductOrderDetailsData(Request $request){
        $invoice_no=$request->input('invoice_no');
        $result=Order::where('invoice_no','=',$invoice_no)->get();
        return $result;
    }
    function ProductOrderStatusEdit(Request $request){
        $statusID=$request->input('statusID');
        $OrderStatus=$request->input('status');

        $ProductOrderData= Order::where('invoice_no',$statusID)->get();
        $phone=$ProductOrderData[0]['mobile'];
        $name=$ProductOrderData[0]['name'];
        $six_digit_random_number = mt_rand(100000, 999999);

        

        if ($OrderStatus=='Rejected'){
            //message text
            $receiverNumber = "+880".$phone;
            $message = "Hi, ".$name." Your order has been Rejected";
      
            try {
      
                $account_sid = getenv("TWILIO_SID");
                $auth_token = getenv("TWILIO_TOKEN");
                $twilio_number = getenv("TWILIO_FROM");
      
                $client = new Client($account_sid, $auth_token);
                $client->messages->create($receiverNumber, [
                    'from' => $twilio_number, 
                    'body' => $message]);
      
               
      
            } catch (Exception $e) {
                dd("Error: ". $e->getMessage());
            }
         
                $result=Order::where('invoice_no',$statusID)->update([
                    'order_status'=>$OrderStatus
                ]);

                return $result;
            


        }
        else if ($OrderStatus=='Accepted'){

            //message text
            $receiverNumber = "+880".$phone;
            $message = "Hi, ".$name." Your order has been Accepted";
      
            try {
      
                $account_sid = getenv("TWILIO_SID");
                $auth_token = getenv("TWILIO_TOKEN");
                $twilio_number = getenv("TWILIO_FROM");
      
                $client = new Client($account_sid, $auth_token);
                $client->messages->create($receiverNumber, [
                    'from' => $twilio_number, 
                    'body' => $message]);
      
               
                    $result=Order::where('invoice_no',$statusID)->update([
                        'order_status'=>$OrderStatus
                    ]);
                    return $result;
      
            } catch (Exception $e) {
                dd("Error: ". $e->getMessage());
            }

            
        }
        else if ($OrderStatus=='Delivered'){
            //message text
            $receiverNumber = "+880".$phone;
            $message = "Hi, ".$name." Your order has been Rejected";
      
            try {
      
                $account_sid = getenv("TWILIO_SID");
                $auth_token = getenv("TWILIO_TOKEN");
                $twilio_number = getenv("TWILIO_FROM");
      
                $client = new Client($account_sid, $auth_token);
                $client->messages->create($receiverNumber, [
                    'from' => $twilio_number, 
                    'body' => $message]);
      
            //    status change in order table
            $result=Order::where('invoice_no',$statusID)->update([
                'order_status'=>$OrderStatus
            ]);
            return $result;
      
            } catch (Exception $e) {
                dd("Error: ". $e->getMessage());
            }
              
            
        }
        else{
            $result=Order::where('invoice_no',$statusID)->update([
                'order_status'=>$OrderStatus
            ]);
            return $result;
        }



    }
    
    function ProductOrderInvoiceData(Request $request){
        $id=$request->input('id');
        $OrderData=Order::where('invoice_no','=',$id)->get();
        $sub_total=0;
        foreach ($OrderData as $OrderDatas){
            $total_price_taka=$OrderDatas['total_price'];
            $price_array=explode(" ",$total_price_taka);
            $total_price=$price_array[0];
            $sub_total +=$total_price;
        }
        $result=['order_data'=>$OrderData,'sub_total'=> $sub_total];
        return json_encode($result);
    }
    function ProductOrderDelete(Request $request){
        $id=$request->input('id');
        $result=Order::where('invoice_no','=',$id)->delete();
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }
    
}
