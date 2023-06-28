<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    /**
     * @return void
     */
    public function test_if_dashboard_can_be_accessed_by_logged_in_user(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/dashboard');

        $response->assertOk();
    }
}
