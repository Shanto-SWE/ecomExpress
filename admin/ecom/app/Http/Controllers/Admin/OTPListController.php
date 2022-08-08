<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OTP;

class OTPListController extends Controller
{
    function OtpListPage(){
        return view('OTP.OtpHistory');
    }

    function OtpListData(){
        $result= OTP::orderBy('id','desc')->get();
        return $result;
    }
}
