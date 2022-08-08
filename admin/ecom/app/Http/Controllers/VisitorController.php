<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VisitorDetails;

class VisitorController extends Controller
{
    // get visitor details method
    public function getVisitorDetails(){


        $ip_address=$_SERVER['REMOTE_ADDR'];
        date_default_timezone_set("Asia/Dhaka");
        $visit_time=date('h:i:sa');
        $visit_date=date("d-m-y");

       $result= VisitorDetails::insert([

        'id_address'=>$ip_address,
        'visit_time'=>$visit_time,
        'visit_date'=>$visit_date

        ]);

        return $result;
    }
}
