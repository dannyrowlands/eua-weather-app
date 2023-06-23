<?php

namespace Tests\Unit;

use App\Models\AcuWeather;
use Tests\TestCase;

class AccuWeatherTest extends TestCase
{
    public function test_if_current_wind_speeds_function_exists(): void
    {
        $stormGlass = new StormGlass();
        $reply = $stormGlass->getCurrentWindspeeds();
        dd($reply);
        $this->assertNotEmpty($reply);
    }
}
