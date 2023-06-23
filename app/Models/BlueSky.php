<?php

namespace App\Models;

use App\Constants\Constants;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BlueSky extends Weather
{
    use HasFactory;

    public function getWeather($lat, $lng, $forecast_distances) : array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' =>  Constants::BLUESKY_AUTHORISATION_TOKEN,
            ])->get(Constants::BLUESKY_API_URL, [
                'lat' => $lat,
                'lon' => $lng,
                'forecast_distances' => $forecast_distances
            ]);
            dd($response->json());
            return $response->json();
        } catch (\Exception $e) {
            Log::error('Error thrown in function :: '.__FUNCTION__.' in class '.__CLASS__.' in file '.__FILE__.' ERROR THROWN ::'.$e->getMessage());
        }
    }
}
