<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteInfo;

class SiteInfoController extends Controller
{
    public function sendSiteInfo(){
       $result= SiteInfo::get();
       return $result;

    }
}
