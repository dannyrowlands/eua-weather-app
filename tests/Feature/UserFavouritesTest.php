<?php

namespace Tests\Feature;

use App\Models\Favourite;
use App\Models\User;
use Tests\TestCase;

class UserFavouritesTest extends TestCase
{
    /**
     * @return void
     */
    public function test_if_favourite_structures_exists(): void
    {
        $favourite = Favourite::factory()->create();
        $this->assertInstanceOf(Favourite::class, $favourite);
    }

    /**
     * @return void
     */
    public function test_if_favourite_can_be_saved(): void
    {
        $user = User::factory()->create();
        Favourite::factory()->count(5)->create(
            [
                'user_id' => $user->id,
            ]
        );

        $this->assertTrue(count($user->favourites) === 5);
    }

    /**
     * @return void
     */
    public function test_if_favourite_can_be_retrieved_with_correct_data(): void
    {
        $user = User::factory()->create();
        Favourite::factory()->count(1)->create(
            [
                'user_id' => $user->id,
                'data' => 'FeatureTestData'
            ]
        );

        $this->assertTrue($user->favourites[0]->data === 'FeatureTestData');
    }
}
