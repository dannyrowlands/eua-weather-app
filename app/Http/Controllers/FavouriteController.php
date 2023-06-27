<?php

namespace App\Http\Controllers;

use App\Constants\Constants;


use App\Models\Favourite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;

class FavouriteController extends Controller
{

    /**
     * @param Request $request
     * @return bool
     */
    public function store(Request $request) : Favourite
    {
        //dd($request->favourite);
        return Favourite::updateOrCreate(
            ['data' => $request->favourite],
            ['user_id' => $request->user_id]
        );
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function list(Request $request) : Collection
    {
        $favourites = Favourite::where('user_id', $request->user_id)->get();
        return $favourites;
    }
}
