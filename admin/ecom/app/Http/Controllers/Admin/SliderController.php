<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Productlist;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    
    function SliderListPage(){
        return view('Product.Slider');
    }

    function SliderListData(){
        $result= Slider::orderBy('id','desc')->get();
        return $result;
    }
    function GetProductCode(){
        $result= Productlist::select('id','product_name','product_code')->orderBy('id','desc')->get();
        return $result;
    }
    function SliderDelete(Request $request){
        $id=$request->input('id');
        $imageURL=$request->input('imageURL');

        $OldPhotoURLArray= explode("/", $imageURL);
        $OldPhotoName=end($OldPhotoURLArray);

        $result=Slider::where('id','=',$id)->delete();
        Storage::delete('public/'.$OldPhotoName);
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }

    function SliderAdd(Request $request){
        $filePath=$request->file('image')->store('public');
        $fileName=explode("/", $filePath)[1];
        $image="http://".$_SERVER['HTTP_HOST']."/storage/".$fileName;

        $text_color=$request->input('text_color');
        $bg_color=$request->input('bg_color');
        $title=$request->input('title');
        $sub_title=$request->input('sub_title');
        $product_id=$request->input('product_code');

        $product=Productlist::where('id',$product_id)->first();
        $product_code=$product->product_code;
        $subcategory=$product->subcategory;
        
   
  
        $result=Slider::insert([
            'text_color'=>$text_color,
            'bg_color'=>$bg_color,
            'image'=>$image,
            'title'=>$title,
            'subtitle'=>$sub_title,
            'product_code'=> $product_code,
            'subcategory'=> $subcategory,
          
        ]);
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }
    function SliderListEditData(Request $request){
        $id=$request->input('id');
        $result=Slider::where('id','=',$id)->get();
        return $result;
    }
    function SliderDataEdit(Request $request){

        $id=$request->input('id');
        $text_color=$request->input('text_color');
        $bg_color=$request->input('bg_color');
        $title=$request->input('title');
        $sub_title=$request->input('sub_title');
        $product_code=$request->input('product_code');
        $result=Slider::where('id',$id)->update([
            'text_color'=>$text_color,
            'bg_color'=>$bg_color,
            'title'=>$title,
            'subtitle'=>$sub_title,
            'product_code'=>$product_code
        ]);
        return $request;
    }
    function ChangeSliderImage(Request $request){

        $OldPhotoURL=$request->input('oldImage');
        $OldPhotoID=$request->input('ImageID');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('newImage')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;
        $UpdateResult= Slider::where('id','=',$OldPhotoID)->update(['image'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return $UpdateResult;
    }
}
