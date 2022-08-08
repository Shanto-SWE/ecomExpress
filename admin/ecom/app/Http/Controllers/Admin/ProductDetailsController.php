<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductDetails;
use App\Models\Productlist;
use Illuminate\Support\Facades\Storage;
class ProductDetailsController extends Controller
{
    function ProductDetailsPage(){
        return view('Product.ProductDetails');
    }

    function ProductDetailsData(){
        $result= ProductDetails::orderBy('id','desc')->get();
        return $result;
    }

    function GetProductCode(){

        $result= Productlist::orderBy('id','desc')->get();
        return $result;
    }
    function ProductDetailsWithOneImg(Request $request){
        $product_image_1_filePath=$request->file('product_image_1')->store('public');
        $product_image_1_fileName=explode("/", $product_image_1_filePath)[1];
        $imageOne="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_1_fileName;


        $product_code=$request->input('product_code');
        $quick_overview=$request->input('quick_overview');
        $product_details=$request->input('product_details');
        $color=$request->input('color');
        $size=$request->input('size');

        $productDetails=new ProductDetails;

        
        $productcodecouont=ProductDetails::where('product_code',$product_code)->count();

        if($productcodecouont==0){
            $productDetails->product_code=$product_code;
            $productDetails->img1=$imageOne;
            $productDetails->des=$quick_overview;
         
            $productDetails->details=$product_details;
        
    
           
            if($color==null){
    
                $productDetails->color='NA';
            }else{
                $productDetails->color=$color;
    
            }
    
            if($size==null){
    
                $productDetails->size='NA';
            }else{
                $productDetails->size=$size;
    
            }
    
            $productDetails->save();
            
    
           return 1;
        }else{

            return 0;
        }
     
       
    }
    function ProductDetailsWithTwoImg(Request $request){
        $product_image_1_filePath=$request->file('product_image_1')->store('public');
        $product_image_1_fileName=explode("/", $product_image_1_filePath)[1];
        $imageOne="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_1_fileName;

        $product_image_2_filePath=$request->file('product_image_2')->store('public');
        $product_image_2_fileName=explode("/", $product_image_2_filePath)[1];
        $imageTwo="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_2_fileName;

        $product_code=$request->input('product_code');
        $quick_overview=$request->input('quick_overview');
        $product_details=$request->input('product_details');
        $color=$request->input('color');
        $size=$request->input('size');


        $productDetails=new ProductDetails;

        
      $productcodecouont=ProductDetails::where('product_code',$product_code)->count();

      if($productcodecouont==0){
        $productDetails->product_code=$product_code;
        $productDetails->img1=$imageOne;
        $productDetails->img2=$imageTwo;
        $productDetails->des=$quick_overview;
     
        $productDetails->details=$product_details;
    

       
        if($color==null){

            $productDetails->color='NA';
        }else{
            $productDetails->color=$color;

        }

        if($size==null){

            $productDetails->size='NA';
        }else{
            $productDetails->size=$size;

        }

        $productDetails->save();

        return 1;

      }else{

        return 0;
      }

     
 
    }
    function ProductDetailsWithThreeImg(Request $request){
        $product_image_1_filePath=$request->file('product_image_1')->store('public');
        $product_image_1_fileName=explode("/", $product_image_1_filePath)[1];
        $imageOne="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_1_fileName;

        $product_image_2_filePath=$request->file('product_image_2')->store('public');
        $product_image_2_fileName=explode("/", $product_image_2_filePath)[1];
        $imageTwo="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_2_fileName;

        $product_image_3_filePath=$request->file('product_image_3')->store('public');
        $product_image_3_fileName=explode("/", $product_image_3_filePath)[1];
        $imageThree="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_3_fileName;

        $product_code=$request->input('product_code');
        $quick_overview=$request->input('quick_overview');
        $product_details=$request->input('product_details');
        $color=$request->input('color');
        $size=$request->input('size');


        $productDetails=new ProductDetails;

        
        $productcodecouont=ProductDetails::where('product_code',$product_code)->count();
  
        if($productcodecouont==0){
          $productDetails->product_code=$product_code;
          $productDetails->img1=$imageOne;
          $productDetails->img2=$imageTwo;
          $productDetails->img3=$imageThree;
          $productDetails->des=$quick_overview;
       
          $productDetails->details=$product_details;
      
  
         
          if($color==null){
  
              $productDetails->color='NA';
          }else{
              $productDetails->color=$color;
  
          }
  
          if($size==null){
  
              $productDetails->size='NA';
          }else{
              $productDetails->size=$size;
  
          }
  
          $productDetails->save();
  
          return 1;
  
        }else{
  
          return 0;
        }

       
    }
    function ProductDetailsAdd(Request $request){
        $product_image_1_filePath=$request->file('product_image_1')->store('public');
        $product_image_1_fileName=explode("/", $product_image_1_filePath)[1];
        $imageOne="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_1_fileName;

        $product_image_2_filePath=$request->file('product_image_2')->store('public');
        $product_image_2_fileName=explode("/", $product_image_2_filePath)[1];
        $imageTwo="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_2_fileName;

        $product_image_3_filePath=$request->file('product_image_3')->store('public');
        $product_image_3_fileName=explode("/", $product_image_3_filePath)[1];
        $imageThree="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_3_fileName;

        $product_image_4_filePath=$request->file('product_image_4')->store('public');
        $product_image_4_fileName=explode("/", $product_image_4_filePath)[1];
        $imageFour="http://".$_SERVER['HTTP_HOST']."/storage/".$product_image_4_fileName;

        $product_code=$request->input('product_code');
        $quick_overview=$request->input('quick_overview');
        $product_details=$request->input('product_details');
        $color=$request->input('color');
        $size=$request->input('size');

        $productDetails=new ProductDetails;

        
        $productcodecouont=ProductDetails::where('product_code',$product_code)->count();
  
        if($productcodecouont==0){
          $productDetails->product_code=$product_code;
          $productDetails->img1=$imageOne;
          $productDetails->img2=$imageTwo;
          $productDetails->img3=$imageThree;
          $productDetails->img4=$imageFour;
          $productDetails->des=$quick_overview;
       
          $productDetails->details=$product_details;
      
  
         
          if($color==null){
  
              $productDetails->color='NA';
          }else{
              $productDetails->color=$color;
  
          }
  
          if($size==null){
  
              $productDetails->size='NA';
          }else{
              $productDetails->size=$size;
  
          }
  
          $productDetails->save();
  
          return 1;
  
        }else{
  
          return 0;
        }
    }
        
        function ProductDetailsDelete(Request $request){
            $id=$request->input('id');
            $imageURL=$request->input('imageURL');
            $image2URL=$request->input('image2URL');
            $image3URL=$request->input('image3URL');
            $image4URL=$request->input('image4URL');
    
            $OldPhotoURLArray= explode("/", $imageURL);
            $OldPhotoName=end($OldPhotoURLArray);
    
            $OldPhotoURLArray2= explode("/", $image2URL);
            $OldPhotoName2=end($OldPhotoURLArray2);
    
            $OldPhotoURLArray3= explode("/", $image3URL);
            $OldPhotoName3=end($OldPhotoURLArray3);
    
            $OldPhotoURLArray4= explode("/", $image4URL);
            $OldPhotoName4=end($OldPhotoURLArray4);
    
            $result=ProductDetails::where('id','=',$id)->delete();
            Storage::delete('public/'.$OldPhotoName);
            Storage::delete('public/'.$OldPhotoName2);
            Storage::delete('public/'.$OldPhotoName3);
            Storage::delete('public/'.$OldPhotoName4);
            
            if ($result==true){
                return 1;
            }
            else{
                return 0;
            }
 
        

    }
    function ProductImageEditData(Request $request){
        $id=$request->input('id');
        $result=ProductDetails::select('img1','img2','img3','img4')->where('id','=',$id)->get();
        return $result;
    }
    function ChangeProductImageOne(Request $request){

        $OldPhotoURL=$request->input('OldImageName');
        $id=$request->input('editID');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('NewImageName')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;

        $UpdateResult= ProductDetails::where('id','=',$id)->update(['img1'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return $UpdateResult;
    }
    function ChangeProductImageTwo(Request $request){

        $OldPhotoURL=$request->input('OldImageName');
        $id=$request->input('editID');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('NewImageName')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;

        $UpdateResult= ProductDetails::where('id','=',$id)->update(['img2'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return $UpdateResult;
    }
    function ChangeProductImageThree(Request $request){

        $OldPhotoURL=$request->input('OldImageName');
        $id=$request->input('editID');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('NewImageName')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;

        $UpdateResult= ProductDetails::where('id','=',$id)->update(['img3'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return $UpdateResult;
    }
    function ChangeProductImageFour(Request $request){

        $OldPhotoURL=$request->input('OldImageName');
        $id=$request->input('editID');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('NewImageName')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;

        $UpdateResult= ProductDetails::where('id','=',$id)->update(['img4'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return $UpdateResult;
    }
//edit data
function ProductDetailsEditData(Request $request){
    $id=$request->input('id');
    $result=ProductDetails::where('id','=',$id)->get();
    return $result;
}
function ProductDetailsDataEdit(Request $request){
    $editID=$request->input('editID');
    $quick_overview=$request->input('quick_overview');
    $product_details=$request->input('product_details');
    $color=$request->input('color');
    $size=$request->input('size');
    $result=ProductDetails::where('id',$editID)->update([
        'des'=>$quick_overview,
        'color'=>$color,
        'size'=>$size,
        'details'=>$product_details
    ]);
    return $result;
}

}
