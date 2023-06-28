<?php

namespace Tests\Unit;

use RakibDevs\Weather\Weather;
use Tests\TestCase;

class WeatherModuleTest extends TestCase
{
    private $wt;

    /**
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->wt = new Weather();
    }

    /**
     * @return void
     */
    public function test_if_weather_function_exists(): void
    {
        $this->assertInstanceOf(Weather::class, $this->wt);
    }
}
