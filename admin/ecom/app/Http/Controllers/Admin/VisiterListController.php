<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VisitorDetails;

class VisiterListController extends Controller
{
    function VisitorListPage(){
        return view('visitorList');
    }
    function VisitorListData(){
        $result= VisitorDetails::orderBy('id','desc')->get();
        return $result;
    }
}
