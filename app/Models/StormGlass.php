<?php

namespace App\Models;

use App\Constants\Constants;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StormGlass extends Model
{
    use HasFactory;



    public function getCurrentWeather($lat, $lng, $params) : array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => Constants::STORMGLASS_AUTHORISATION_TOKEN,
            ])->get(Constants::STORMGLASS_API_URL, [
                'lat' => $lat,
                'lng' => $lng,
                'params' => $params
            ]);
            return $response->json();
        } catch (\Exception $e) {
            Log::error('Error thrown in function :: '.__FUNCTION__.' in class '.__CLASS__.' in file '.__FILE__.' ERROR THROWN ::'.$e->getMessage());
        }
    }

    public function getFutureWeather($lat, $lng, $params, $start_timestamp) : array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => Constants::STORMGLASS_AUTHORISATION_TOKEN,
            ])->get(Constants::STORMGLASS_API_URL, [
                'lat' => $lat,
                'lng' => $lng,
                'params' => $params,
                'start' => $start_timestamp
            ]);
            return $response->json();
        } catch (\Exception $e) {
            Log::error('Error thrown in function :: '.__FUNCTION__.' in class '.__CLASS__.' in file '.__FILE__.' ERROR THROWN ::'.$e->getMessage());
        }
    }
}
