<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;

class AdminController extends Controller
{
    function SignIn(){
        return view('Login.SignUpSignIn');
    }

    function OnSignIn(Request $request){
        $email=$request->input('email');
        $password=$request->input('password');
        $userCount=Admin::where('email','=',$email)->where('password','=',$password)->count();
        if ($userCount==1){
            $request->session()->put('email',$email);
            return 1;
        }
        else{
            return 0;
        }
    }

    function OnLogOut(Request $request){
        $request->session()->flush();
        return redirect('/');
    }

    //password reset
    function resetPage(){
        return view('PasswordReset');
    }

    public function ResetPassword(Request $request){
        $password=$request->input('password');
        $id='1';
        $result= AdminLoginModel::where('id',$id)->update([
            'password'=>$password
        ]);
        return $result;
    }

    // adminlist method

    function AdminListPage(){
        return view('adminList');
    }

    function AdminListData(){
        $result= Admin::orderBy('id','desc')->get();
        return $result;
    }
    function AdminAdd(Request $request){

        $AdminName = $request->input('AdminName');
        $AdminEmail =$request->input('AdminEmail');
        $AdminMobile =$request->input('AdminMobile');
        $AdminUserName =$request->input('AdminUserName');
        $AdminPass1=$request->input('AdminPass1');

        $result= Admin::insert([
            'name'=>$AdminName,
            'email'=> $AdminEmail,
            'mobile'=>$AdminMobile,
            'username'=>$AdminUserName,
            'password'=>$AdminPass1
        ]);
        return $result;
    }
    function AdminListDelete(Request $request){
        $id=$request->input('id');
        $result=Admin::where('id','=',$id)->delete();
        if ($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }
}
