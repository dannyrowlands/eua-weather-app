<?php

namespace App\Models;

use App\Constants\Constants;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class Weather extends Model
{
    public static function getWeather($lat, $lng, $forecast_distances = []) : array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' =>  Constants::BLUESKY_AUTHORISATION_TOKEN,
            ])->get(Constants::BLUESKY_API_URL, [
                'lat' => $lat,
                'lon' => $lng,
                'forecast_distances' => $forecast_distances
            ]);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Error thrown in function :: '.__FUNCTION__.' in class '.__CLASS__.' in file '.__FILE__.' ERROR THROWN ::'.$e->getMessage());
            return [];
        }
    }
}
