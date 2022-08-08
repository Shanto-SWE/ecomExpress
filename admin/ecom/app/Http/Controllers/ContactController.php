<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function sendContactDetails(Request $request){

        $data=$request->all();

        $contact_date=date('h:i:sa');
        $contct_time=date("d-m-y");
        $contact=new Contact;
        $contact->name=$data['name'];
        $contact->mobile=$data['mobile'];
        $contact->message=$data['message'];
        $contact->contact_time=  $contct_time;
        $contact->contact_date=$contact_date;

      $result=$contact->save();

      return $result;

    }
}
