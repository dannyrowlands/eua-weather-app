<?php

namespace Tests\Feature;

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
    public function test_if_weather_function_returns_valid_data(): void
    {
        $cords = $this->wt->getGeoByCity('new york');
        $info = $this->wt->getOneCallByCord($cords[0]->lat, $cords[0]->lon);
        $this->assertEquals($info->lat, 40.7127);
    }
}
