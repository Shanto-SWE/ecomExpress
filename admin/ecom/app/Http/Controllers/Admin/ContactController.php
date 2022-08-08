<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    function ContactListPage(){
        return view('contactList');
    }

    function ContactListData(){
        $result= Contact::orderBy('id','desc')->get();
        return $result;
    }

    function ContactListDelete(Request $request){
        $id=$request->input('id');
        $result=Contact::where('id','=',$id)->delete();
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }
}
