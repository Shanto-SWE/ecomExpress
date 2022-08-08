<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subcategory;
use App\Models\Productlis;

class SubcategoryController extends Controller
{
    function SubCategoryListPage(){
        return view('Product.subCategory');
    }

    function SubCategoryListData(){
        $result= Subcategory::orderBy('id','desc')->get();
        return $result;
    }

    function SubCategoryAdd(Request $request){

        $cat_name=$request->input('cat_name');
        $sub_cat=$request->input('sub_cat_name');
        $result=Subcategory::insert([
            'category_name'=>$cat_name,
            'subcategory_name'=>$sub_cat,
        ]);
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }
    function SubCategoryDelete(Request $request){
        $id=$request->input('id');
        $result=Subcategory::where('id','=',$id)->delete();
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }

    function GetSubCategoryEditData(Request $request){
        $id=$request->input('id');
        $result=Subcategory::where('id','=',$id)->get();
        return $result;
    }


    function SubCategoryNameEdit(Request $request){
        $sub_id=$request->input('sub_id');
        $old_sub_name=$request->input('old_sub_name');
        $new_sub_name=$request->input('new_sub_name');

   
      

        Subcategory::where('id',$sub_id)->update('subcategory_name',$new_sub_name);
        Productlis::where('subcategory',$old_sub_name)->update([
            'subcategory'=>$new_sub_name
        ]);

        return 1;

    }
}
