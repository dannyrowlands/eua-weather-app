<?php

namespace Tests\Feature\api;

use App\Models\Favourite;
use App\Models\User;
use Tests\TestCase;

class UserFavouritesApiTest extends TestCase
{

    /**
     * @return void
     */
    public function test_if_favourite_can_be_saved_via_api(): void
    {
        $user = User::factory()->create();

        $this->post('api/favourite', [
            'favourite' => 'Test City',
            'user_id' => $user->id,
        ]);

        $this->assertTrue($user->favourites[0]->data === 'Test City');
    }

    /**
     * @return void
     */
    public function test_if_favourite_can_be_retrieved_with_correct_data_via_api(): void
    {
        $user = User::factory()->create();
        Favourite::factory()->count(1)->create(
            [
                'user_id' => $user->id,
                'data' => 'FeatureTestData'
            ]
        );
        $this->post('api/favourite', [
            'favourite' => 'Test City',
            'user_id' => $user->id,
        ]);
        $this->get('api/favourites', [
            'user_id' => $user->id,
        ]);

        $this->assertTrue($user->favourites[0]->data === 'Test City');
    }
}
