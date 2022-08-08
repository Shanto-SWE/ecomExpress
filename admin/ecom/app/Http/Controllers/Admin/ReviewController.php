<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductReview;

class ReviewController extends Controller
{
    function ProductReviewPage(){
        return view('Review.ProductReview');
    }

    function ProductReviewData(){
        $result= ProductReview::orderBy('id','desc')->get();
        return $result;
    }
    function ProductReviewDelete(Request $request){
        $id=$request->input('id');
        $result=ProductReview::where('id','=',$id)->delete();
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }

}
