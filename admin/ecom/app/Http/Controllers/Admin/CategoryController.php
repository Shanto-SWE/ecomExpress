<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Productlist;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    function CategoryListPage(){
        return view('Product.category');
    }

    function CategoryListData(){
        $result= Category::orderBy('id','desc')->get();
        return $result;
    }
    function GetCategoryName(Request $request){
        $id=$request->input('id');
        $result=Category::where('id','=',$id)->get();
        return $result;
    }
    function CategoryDelete(Request $request){
        $id=$request->input('id');
        $imageURL=$request->input('imageURL');

        $OldPhotoURLArray= explode("/", $imageURL);
        $OldPhotoName=end($OldPhotoURLArray);

        $result=Category::where('id','=',$id)->delete();
        Storage::delete('public/'.$OldPhotoName);
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }


    function CategoryAdd(Request $request){
        $filePath=$request->file('cat_image')->store('public');
        $fileName=explode("/", $filePath)[1];
        $cat_image="http://".$_SERVER['HTTP_HOST']."/storage/".$fileName;

        $cat_name=$request->input('cat_name');
        $result=Category::insert([
            'category_name'=>$cat_name,
            'category_image'=>$cat_image,
        ]);
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }
    function ChangeCategoryImage(Request $request){

        $OldPhotoURL=$request->input('oldImage');
        $OldPhotoID=$request->input('ImageID');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('newImage')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;
        $UpdateResult= Category::where('id','=',$OldPhotoID)->update(['category_image'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return $UpdateResult;
    }
    function CategoryNameEdit(Request $request){
        $cat_id=$request->input('cat_id');
        $old_cat_name=$request->input('old_cat_name');
    
        $new_cat_name=$request->input('new_cat_name');

     

 

        Category::where('id',$cat_id)->update([
            'category_name'=>$new_cat_name
        ]);
        Subcategory::where('category_name',$old_cat_name)->update([
            'category_name'=>$new_cat_name
        ]);
        Productlist::where('category',$old_cat_name)->update([
            'category'=>$new_cat_name
        ]);

        return  1;
    }
}
