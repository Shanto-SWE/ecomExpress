<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\Notification;
use App\Models\Order;
use App\Models\VisitorDetails;


class HomeController extends Controller
{
    public function HomePage(){

        return view('dashboard');
    }

    function HomeSummary(){
        $pending='pending';
        $TotalAdmin=0;
        $TotalContact=Contact::count();
        $TotalNotification=Notification::count();
        $TotalVisitor=VisitorDetails::count();
        $TotalCustomOrder=0;
        $TotalOrder=Order::count();
        $TotalPendingOrder=Order::where('order_status',$pending)->count();

        $SummaryArray=[
            'TotalAdmin'=>$TotalAdmin,
            'TotalContact'=>$TotalContact,
            'TotalNotification'=>$TotalNotification,
            'TotalVisitor'=>$TotalVisitor,
            'TotalCustomOrder'=>$TotalCustomOrder,
            'TotalOrder'=>$TotalOrder,
            'TotalPendingOrder'=>$TotalPendingOrder,
        ];

        return json_encode($SummaryArray);
    }
}
