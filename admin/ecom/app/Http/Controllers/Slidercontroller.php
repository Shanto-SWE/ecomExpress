<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slider;

class Slidercontroller extends Controller
{
    public function sendSliderInfo(){

        $result= Slider::get();
        return $result;



    }
}
