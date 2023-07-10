<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Models\Preference;
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

        $preference = Preference::where('user_id', Auth::user()->id)->first();
        $email_state = isset($preference->data['daily_email']) && $preference->data['daily_email'] === 'true';

        return Inertia::render('Weather',
            [
                'data' => [
                    'locationName' => $location_name,
                    'weather' => $weather,
                    'favouriteList' => Favourite::where('user_id', Auth::user()->id)->get(),
                    'emailState' => $email_state
                ]
            ]
        );
    }

    public function skymaster()
    {
        $location = geoip(request()->ip());
        $weather = Weather::getWeather($location->city);
        $location_name = $location->city;

        $preference = Preference::where('user_id', Auth::user()->id)->first();
        $email_state = isset($preference->data['daily_email']) && $preference->data['daily_email'] === 'true';

        return Inertia::render('Skymaster',
            [
                'data' => [

                ]
            ]
        );
    }
}
