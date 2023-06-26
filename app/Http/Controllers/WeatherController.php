<?php

namespace App\Http\Controllers;

use App\Constants\Constants;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RakibDevs\Weather\Weather;

class WeatherController extends Controller
{
    public function weatherLookup(Request $request, $city)
    {
        $this->wt = new Weather();
        $cords = $this->wt->getGeoByCity($city);
        return $this->wt->getOneCallByCord($cords[0]->lat, $cords[0]->lon);
    }
}
