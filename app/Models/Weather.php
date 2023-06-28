<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Weather extends Model
{
    public static function getWeather($city) : \stdClass
    {
        try {
            $wt = new \RakibDevs\Weather\Weather();
            $cords = $wt->getGeoByCity($city);

            if(isset($cords[0])) {
                return $wt->getOneCallByCord($cords[0]->lat, $cords[0]->lon);
            }
            return new \stdClass();
        } catch (\Exception $e) {
            Log::error('Error thrown in function :: '.__FUNCTION__.' in class '.__CLASS__.' in file '.__FILE__.' ERROR THROWN ::'.$e->getMessage());
            return new \stdClass();
        }
    }
}
