<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function NotificationHistory(){

      $result=  Notification::orderBy('id', 'desc')->take(50)->get();
      return $result;

    }
    public function NotificationHistoryCount(Request $request){

    
      $result=Notification::where('status','unread')->count();
      return $result;



    }

    public function NotificationHistoryRead(){

      $update=Notification::where('status','unread')->update(['status'=>'read']);
      return $update;
    }
}
