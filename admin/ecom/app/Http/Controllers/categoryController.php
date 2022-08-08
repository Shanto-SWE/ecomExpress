<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Subcategory;

class categoryController extends Controller
{
    public function sendCategoryDetails(){

            $category=Category::all();

            $categoryDetailsArray=[];

            foreach($category as $value){
                  
                $subcategory=Subcategory::where('category_name',$value['category_name'])->get();

                $item=[
                  'category_name'=>$value['category_name'],
                  'category_image'=>$value['category_image'],
                  'subcategory'=>$subcategory

                ];

                array_push($categoryDetailsArray,$item);


            }

            return $categoryDetailsArray;
    }
}
