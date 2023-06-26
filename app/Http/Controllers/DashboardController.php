<?php

namespace App\Http\Controllers;

use App\Constants\Constants;
use App\Models\Weather;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function show()
    {
        $location = geoip(request()->ip());
        $weather = Weather::getWeather($location->lat, $location->lon);
        $location_name = $location->city;

        return Inertia::render('Dashboard',
            [
                'data' => [
                    'locationName' => $location_name,
                    'weather' => $weather
                ]
            ]
        );
    }
}
