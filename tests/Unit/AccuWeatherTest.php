<?php

namespace Tests\Unit;

use App\Models\AcuWeather;
use Tests\TestCase;

class AccuWeatherTest extends TestCase
{
    public function test_if_current_wind_speeds_function_exists(): void
    {
        $blueSky = new StormGlass();
        $reply = $blueSky->getCurrentWindspeeds();
        dd($reply);
        $this->assertNotEmpty($reply);
    }
}
