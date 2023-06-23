<?php

namespace Tests\Unit;

use App\Models\StormGlass;
use App\Constants\Constants;
use Tests\TestCase;

class StormGlassCurrentTest extends TestCase
{
    private $stormGlass;
    private $reply;

    protected function setUp(): void
    {
        parent::setUp();
        $this->stormGlass = new StormGlass();
        $this->reply = $this->stormGlass->getCurrentWeather(
            Constants::DEFAULT_LAT,
            Constants::DEFAULT_LONG,
            Constants::STORMGLASS_PARAMS
        );
    }
//    public function test_if_current_weather_function_exists(): void
//    {
//        $this->assertNotEmpty($this->reply);
//    }

    public function test_if_current_weather_function_returns_an_array(): void
    {
        dd($this->reply);
        $this->assertIsArray($this->reply);
    }
}
