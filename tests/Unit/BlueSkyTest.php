<?php

namespace Tests\Unit;

use App\Models\BlueSky;
use App\Constants\Constants;
use Carbon\Carbon;
use Tests\TestCase;

class BlueSkyTest extends TestCase
{
    private $blueSky;
    private $reply;

    protected function setUp(): void
    {
        parent::setUp();

        $this->blueSky = new BlueSky();
        $this->reply = $this->blueSky->getWeather(
            Constants::DEFAULT_LAT,
            Constants::DEFAULT_LONG,
            Constants::BLUESKY_PARAMS
        );
    }

    public function test_if_future_weather_function_exists(): void
    {
        dd($this->reply);
        $this->assertNotEmpty($this->reply);
    }
}
