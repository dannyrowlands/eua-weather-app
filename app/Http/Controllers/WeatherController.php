<?php

namespace App\Http\Controllers;

use App\Constants\Constants;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    public function weatherLookup(Request $request, $city) : object
    {
        $weather = new \App\Models\Weather();
        return $weather->getWeather($city);
    }
}
