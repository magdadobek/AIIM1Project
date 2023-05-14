<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestApiController;
use App\Http\Controllers\RestApiUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/welcome', [RestApiController::CLASS, 'showWelcome']);
Route::get('/user/login', [RestApiUserController::class, 'LoginUser']);
Route::get('/user/logout', [RestApiUserController::class, 'LogoutUser']);
Route::post('/user/new',[RestApiUserController::class,'NewUser']);
Route::post('/user/refresh',[RestApiUserController::class,'refreshUser']);
Route::delete('/user/delete/{id}', [RestApiUserController::class, 'DeleteUser']);
Route::patch('/user/update/all/{id}', [RestApiUserController::class, 'UpdateUserAll']);
Route::patch('/user/update/password/{id}', [RestApiUserController::class, 'UpdateUserPassword']);
Route::get('/user/find/{id}', [RestApiUserController::class, 'FindUser']);
