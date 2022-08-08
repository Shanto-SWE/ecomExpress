<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Productlist;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Support\Facades\Storage;

class ProductListController extends Controller
{
    function ProductListPage(){
        return view('Product.ProductList');
    }

    function ProductListData(){
        $result= Productlist::orderBy('id','desc')->get();
        return $result;
    }
    function GetCategoryList(){
        $result= Category::select('category_name')->orderBy('id','desc')->get();
        return $result;
    }

    function GetSubCategoryAsCategory(Request $request){
        $category_name=$request->input('category_name');
        $result=Subcategory::select('subcategory_name')->where('category_name','=',$category_name)->get();
        return $result;
    }
    function ProductListDelete(Request $request){
        $id=$request->input('id');
        $imageURL=$request->input('imageURL');

        $OldPhotoURLArray= explode("/", $imageURL);
        $OldPhotoName=end($OldPhotoURLArray);

        $result=Productlist::where('id','=',$id)->delete();
        Storage::delete('public/'.$OldPhotoName);
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }

    function ProductListAdd(Request $request){
        $filePath=$request->file('image')->store('public');
        $fileName=explode("/", $filePath)[1];
        $image="http://".$_SERVER['HTTP_HOST']."/storage/".$fileName;

        $title=$request->input('title');
        $price=$request->input('price');
        $special_price=$request->input('special_price');
        $category=$request->input('category');
        $subcategory=$request->input('subcategory');
        $remark=$request->input('remark');
        $brand=$request->input('brand');
        
        $star=$request->input('star');
        $stock=$request->input('stock');
        $product_code=$request->input('product_code');

        $productlist=new Productlist;

        $productlist->product_name=$title;
        $productlist->price=$price;

        if($special_price==null){

            $productlist->discount_price=0;
        }else{
            $productlist->discount_price=$special_price;

        }
     
        $productlist->product_image=$image;
        $productlist->category=$category;
        $productlist->subcategory=$subcategory;
        $productlist->remark=$remark;
        $productlist->brand=$brand;
        $productlist->remark=$remark;
        $productlist->rating=$star;
        $productlist->product_code=$product_code;
        $productlist->stock=$stock;
        $productlist->status='Active';
        

        $productlist->save();

       return 1;
        
    }

    function ChangeProductListImage(Request $request){

        $OldPhotoURL=$request->input('oldImage');
        $OldPhotoID=$request->input('ImageID');

        $OldPhotoURLArray= explode("/", $OldPhotoURL);
        $OldPhotoName=end($OldPhotoURLArray);


        $NewPhotoPath=$request->file('newImage')->store('public');
        $NewPhotoName=explode("/", $NewPhotoPath)[1];
        $NewPhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$NewPhotoName;
        $UpdateResult= Productlist::where('id','=',$OldPhotoID)->update(['product_image'=>$NewPhotoURL]);
        $DeleteResult= Storage::delete('public/'.$OldPhotoName);

        return $UpdateResult;
    }
    function ProductListEditData(Request $request){
        $id=$request->input('id');
        $result=Productlist::where('id','=',$id)->get();
        return $result;
    }
    function ProductListDataEdit(Request $request){
        $editID=$request->input('editID');
        $title=$request->input('title');
        $price=$request->input('price');
        $special_price=$request->input('special_price');
        $remark=$request->input('remark');
        $star=$request->input('star');
        $stock=$request->input('stock');
        $result=Productlist::where('id',$editID)->update([
            'product_name'=>$title,
            'price'=>$price,
            'discount_price'=>$special_price,
            'remark'=>$remark,
            'rating'=>$star,
            'stock'=>$stock
        ]);
        return $result;
    }
    

}
