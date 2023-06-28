<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Weather;

class WeatherController extends Controller
{
    public function weatherLookup(Request $request, $city) : object
    {
        $weather = new Weather();
        return $weather->getWeather($city);
    }
}
