<?php

namespace App\Models;

use App\Constants\Constants;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class Weather extends Model
{
    use HasFactory;

    public function getWeather($lat, $lng, $forecast_distances)
    {
        //
    }
}
