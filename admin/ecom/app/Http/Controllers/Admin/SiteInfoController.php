<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SiteInfo;

class SiteInfoController extends Controller
{
    function AboutPage(){
        return view('about');
    }
    function AboutCompanyPage(){
        return view('about_company');
    }
    function TermsPage(){
        return view('terms');
    }
    function PolicyPage(){
        return view('policy');
    }
    function PurchasePage(){
        return view('purchaseGuide');
    }
    function MobileAppPage(){
        return view('mobileApp');
    }
    function SocialPage(){
        return view('social');
    }


    function AddressPage(){
        return view('address');
    }

    function GetSiteInfoDetails(){
        $result= SiteInfo::get();
        return $result;
     }
 
     function UpdateSiteInfo(Request $request){
         $infoData=$request->input('infoData');
         $infoColumn= $request->input('infoColumn');
         $result= SiteInfo::where('id','=',1)->update([$infoColumn=> $infoData]);
         return $result;
     }
}
