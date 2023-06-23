<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class AcuWeather extends Model
{
    use HasFactory;


    const API_URL = 'https://api.stormglass.io/v2/weather/point';
    const AUTHORISATION_TOKEN = '038bccda-11aa-11ee-a654-0242ac130002-038bcdca-11aa-11ee-a654-0242ac130002';

    public function getCurrentWindSpeeds() : array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => self::AUTHORISATION_TOKEN,
            ])->get(self::API_URL, [
                'lat' => '58.7984',
                'lng' => '17.8081',
                'params' => 'windSpeed'
            ]);
            return $response->json();
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function getFutureWeather() : bool
    {

    }
}
