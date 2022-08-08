<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    function BrandListPage(){
        return view('Product.Brand');
    }

    function BrandListData(){
        $result= Brand::orderBy('id','desc')->get();
        return $result;
    }
    function BrandAdd(Request $request){
        $filePath=$request->file('image')->store('public');
        $fileName=explode("/", $filePath)[1];
        $brand_image="http://".$_SERVER['HTTP_HOST']."/storage/".$fileName;
        $brand_name=$request->input('brand_name');
        $result=Brand::insert([
            'brand_name'=>$brand_name,
            'brand_image'=>$brand_image,
        ]);
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }
    function ChangeBrandImage(Request $request){

        $OldPhotoURL=$request->input('oldImage');
        $OldPhotoID=$request->input('ImageID');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('newImage')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;
        $UpdateResult= Brand::where('id','=',$OldPhotoID)->update(['brand_image'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return $UpdateResult;
    }
    function BrandDelete(Request $request){
        $id=$request->input('id');
        $imageURL=$request->input('imageURL');

        $OldPhotoURLArray= explode("/", $imageURL);
        $OldPhotoName=end($OldPhotoURLArray);

        $result=Brand::where('id','=',$id)->delete();
        Storage::delete('public/'.$OldPhotoName);
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }

}
