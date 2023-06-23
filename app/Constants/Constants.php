<?php
namespace App\Constants;

class Constants
{
    //StormGlass
    const DEFAULT_LAT = '58.7984';
    const DEFAULT_LONG = '17.8081';
    const STORMGLASS_PARAMS = 'windSpeed,windDirection,gust,precipitation,currentSpeed,currentDirection,cloudCover,visibility';
    const STORMGLASS_API_URL = 'https://api.stormglass.io/v2/weather/point';
    const STORMGLASS_AUTHORISATION_TOKEN = 'c640c122-11b4-11ee-a654-0242ac130002-c640c1d6-11b4-11ee-a654-0242ac130002';

    //AccuWeather
    const ACCUWEATHER_PARAMS = 'windSpeed,windDirection,gust,precipitation,currentSpeed,currentDirection';
    const ACCUWEATHER_API_URL = 'https://api.ACCUWEATHER.io/v2/weather/point';
    const ACCUWEATHER_AUTHORISATION_TOKEN = 'c640c122-11b4-11ee-a654-0242ac130002-c640c1d6-11b4-11ee-a654-0242ac130002';
}
