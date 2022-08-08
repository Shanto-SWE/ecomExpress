<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductReview;

class ReviewController extends Controller
{
    public function PostReview(Request $request){


        $product_name=$request->input('product_name');
        $product_code=$request->input('product_code');
        $mobile=$request->input('mobile');
        $reviewer_name=$request->input('reviewer_name');
        $rating=$request->input('rating');
        $comments=$request->input('comments');

      $result=ProductReview::insert([
         'product_code'=>$product_code,
         'product_name'=>$product_name,
         'mobile'=>$mobile,
         'reviewer_photo'=>'photo.jpg',
         'reviewer_name'=>$reviewer_name,
         'rating'=>$rating,
         'comments'=>$comments


        ]);

        return $result;



    }

    public function reviewList(Request $request){


        $code=$request->code;
        $result=  ProductReview::where('product_code',$code)->orderBy('id', 'desc')->take(5)->get();
        return $result;

    }
}
