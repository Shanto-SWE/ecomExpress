<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Site_seo;
use Illuminate\Support\Facades\Storage;

class SeoController extends Controller
{
    function siteSEO(){
        return view('siteSEO');
    }
    function GetSEODetails(){


     
         $result= Site_seo::orderBy('id','desc')->get();

         $count= Site_seo::orderBy('id','desc')->get()->count();

         if($count==0){
            return 0;
         }else{
            return $result;

         }
        
    }
    function UpdateSEODetails(Request $request){
        $SiteTitle=  $request->input('SiteTitle');
        $SiteDes=  $request->input('SiteDes');
        $SiteKey= $request->input('SiteKey');
        $OgTitle= $request->input('OgTitle');
        $OgDes=  $request->input('OgDes');
        $OgSiteName=  $request->input('OgSiteName');
        $OgUrl=  $request->input('OgUrl');
        $id=  $request->input('id');
        $result=Site_seo::where('id','=',$id)->update(
            [
                'title'=>$SiteTitle,
                'des'=>$SiteDes,
                'keywords'=>$SiteKey,
                'og_title'=>$OgTitle,
                'og_des'=>$OgDes,
                'og_sitename'=>$OgSiteName,
                'og_url'=>$OgUrl,
            ]);
        return $result;
    }
    
    function ChangeSEOIMG(Request $request){

        $OldPhotoURL=$request->input('OldPhotoURL');
        $OldPhotoID=$request->input('id');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('photo')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;
        $UpdateResult= Site_seo::where('id','=',$OldPhotoID)->update(['og_img'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return 1;
    }
}
