<?php

use App\Http\Controllers\WeatherController;
use App\Http\Controllers\FavouriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/weather/{city}', [WeatherController::class, 'weatherLookup'])->name('weather.lookup');
Route::get('/favourites', [FavouriteController::class, 'list'])->name('favourite.list');
Route::post('/favourite', [FavouriteController::class, 'store'])->name('favourite.add');
Route::delete('/favourite', [FavouriteController::class, 'delete'])->name('favourite.delete');
