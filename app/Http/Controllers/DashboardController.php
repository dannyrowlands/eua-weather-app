<?php

namespace App\Http\Controllers;

use App\Constants\Constants;
use App\Models\Favourite;
use App\Models\Weather;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function show()
    {
        $location = geoip(request()->ip());
        $weather = Weather::getWeather($location->city);
        $location_name = $location->city;

        return Inertia::render('Dashboard',
            [
                'data' => [
                    'locationName' => $location_name,
                    'weather' => $weather,
                    'userId' => Auth::user()->id,
                    'favouriteList' => Favourite::where('user_id', Auth::user()->id)->get()
                ]
            ]
        );
    }
}
