<?php

namespace Tests\Feature;

use RakibDevs\Weather\Weather;
use Tests\TestCase;

class WeatherModuleTest extends TestCase
{
    const CITY = 'new york';
    const EXPECTED_CORD = 40.7127;

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
        $cords = $this->wt->getGeoByCity(self::CITY);
        $info = $this->wt->getOneCallByCord($cords[0]->lat, $cords[0]->lon);
        $this->assertEquals($info->lat, self::EXPECTED_CORD);
    }

    /**
     * @return void
     */
//    public function test_if_weather_function_returns(): void
//    {
//        $cords = $this->wt->getGeoByCity('lancaster');
//        $info = $this->wt->getOneCallByCord($cords[0]->lat, $cords[0]->lon);
//        dd($cords, $info);
//        $this->assertEquals($info->lat, self::EXPECTED_CORD);
//    }
}
