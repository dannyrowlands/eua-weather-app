<?php

namespace Tests\Feature;

use Tests\TestCase;

class BaseTest extends TestCase
{
    public function test_that_app_responds(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
