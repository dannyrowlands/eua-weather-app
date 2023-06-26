<?php

namespace Tests\Feature;

use App\Models\Preference;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserPreferencesTest extends TestCase
{
    /**
     * @return void
     */
    public function test_if_favourite_structures_exists(): void
    {
        $preference = Preference::factory()->create();
        $this->assertInstanceOf(Preference::class, $preference);
    }

    /**
     * @return void
     */
    public function test_if_favourite_can_be_saved(): void
    {
        $user = User::factory()->create();
        Preference::factory()->create(
            [
                'user_id' => $user->id,
            ]
        );

        $this->assertInstanceOf(Preference::class, $user->preference);
    }

    /**
     * @return void
     */
    public function test_if_favourite_can_be_retrieved_with_correct_data(): void
    {
        $data = json_encode(
            [
                'daily_email' => true
            ]
        );

        $user = User::factory()->create();
        Preference::factory()->create(
            [
                'user_id' => $user->id,
                'data' => $data
            ]
        );

        $this->assertTrue(json_decode($user->preference->data, true) === json_decode($data,true));
    }
}
