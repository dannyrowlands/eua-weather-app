<?php

namespace Tests\Unit;

use App\Models\StormGlass;
use App\Constants\Constants;
use Carbon\Carbon;
use Tests\TestCase;

class StormGlassFutureTest extends TestCase
{
    private $stormGlass;
    private $reply;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->stormGlass = new StormGlass();
        $this->reply = $this->stormGlass->getFutureWeather(
            Constants::DEFAULT_LAT,
            Constants::DEFAULT_LONG,
            Constants::STORMGLASS_PARAMS,
            Carbon::now()->addDay()
        );
    }

    public function test_if_future_weather_function_exists(): void
    {
        dd($this->reply);
        $this->assertNotEmpty($this->reply);
    }
}
