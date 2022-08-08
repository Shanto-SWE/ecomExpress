<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Twilio\Rest\Client;
use App\Models\OTP;
class LoginController extends Controller
{
    
    function createOtp(Request $request)
    {


        $mobile=$request->mobile;
        $code=rand(111111,999999);
        $receiverNumber = "+880".$mobile;
        $message = "Ecom Express login Verification code ".$code;
  
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

           $created_time=date('h:i:sa');
           $created_date=date('d-m-y');

          $result= OTP::insert([

            'mobile'=>$mobile,
            'otp'=>$code,
            'create_date'=>$created_date,
            'create_time'=>$created_time,
            'status'=>'pendding'

          ]);

         return $result;




  
    }

    public function OtpVerification(Request $request){

    $OTP=$request->input('OTP');
    $mobileNo=$request->input('mobileNo');


     $countNo=OTP::where('mobile',$mobileNo)->where('otp',$OTP)->where('status','pendding')->count();

     if($countNo>0){

        $updateStatus=OTP::where('mobile',$mobileNo)->where('otp',$OTP)->update(['status'=>'collected']);
        return 1;
     }else{

        return 0;
     }



    }
}
