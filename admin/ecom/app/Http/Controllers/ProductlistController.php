<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productlist;

class ProductlistController extends Controller
{
    public function productListByRemark(Request $request){
      $remark=$request->remark;

      $productlist=Productlist::where('remark',$remark)->get();
      return $productlist;

    }

    public function productListBySubcategory(Request $request){

      $category=$request->category;
      $subcategory=$request->subcategory;

      $productlistBySubcategory=Productlist::where('category',$category)->where('subcategory',$subcategory)->get();
      return $productlistBySubcategory;
    }

    public function productListByCategory(Request $request){

      $category=$request->category;


      $productlistByCategory=Productlist::where('category',$category)->get();
      return $productlistByCategory;

    }

    public function SearchByProduct(Request $request){

      $key=$request->searchKey;
      $productlist= Productlist::where('product_name','LIKE','%'.$key.'%')->get();

      return  $productlist;


    }
}
