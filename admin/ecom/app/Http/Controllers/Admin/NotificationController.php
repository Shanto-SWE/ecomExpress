<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    
    function NotificationListPage(){
        return view('notificationList');
    }

    function NotificationListData(){
        $result= Notification::orderBy('id','desc')->get();
        return $result;
    }

    function CreateNotification(Request $request){

        $subject= $request->input('subject');
        $msg= $request->input('msg');
        date_default_timezone_set("Asia/Dhaka");
        $notification_time= date("h:i:sa");
        $notification_date= date("d-m-Y");
 
        //  $content= array("en" => "$msg");
        //  $fields = array(
        //      'app_id' => "7bf5fd86-e233-4aef-aea9-3fc8b9ce223e",
        //      'included_segments' => array('All'),
        //      'data' => array("foo" => "bar"),
        //      'contents' => $content,
        //      'headings' => array("en"=>"$subject"),
        //  );
 
        //  $fields = json_encode($fields);
        //  $ch = curl_init();
        //  curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        //  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        //      'Content-Type: application/json; charset=utf-8',
        //      'Authorization: Basic ZDUzZjZkYjUtZjE2Ni00NzIwLTlkZGEtM2U0ZDAxMzYzYjNh'
        //  ));
        //  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        //  curl_setopt($ch, CURLOPT_HEADER, FALSE);
        //  curl_setopt($ch, CURLOPT_POST, TRUE);
        //  curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        //  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        //  curl_exec($ch);
 
 
 
         $result= Notification::insert([
             'title'=> $subject,
             'msg'=> $msg,
             'time'=>$notification_time,
             'date'=>$notification_date,
             'status'=>'unread'
         ]);
 
         return $result;
     }

}
