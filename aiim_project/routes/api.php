<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestApiController;
use App\Http\Controllers\RestApiUserController;
use App\Http\Controllers\RestApiNoticeBoardController;
use App\Http\Controllers\RestApiCommentController;
use App\Http\Controllers\RestApiQnAController;

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

Route::get('/welcome', [RestApiController::class, 'showWelcome']);

Route::get('/user/login', [RestApiUserController::class, 'LoginUser']);
Route::get('/user/logout', [RestApiUserController::class, 'LogoutUser']);
Route::post('/user/new',[RestApiUserController::class,'NewUser']);
Route::post('/user/refresh',[RestApiUserController::class,'refreshUser']);
Route::delete('/user/delete/{id}', [RestApiUserController::class, 'DeleteUser']);
Route::patch('/user/update/all/{id}', [RestApiUserController::class, 'UpdateUserAll']);
Route::patch('/user/update/password/{id}', [RestApiUserController::class, 'UpdateUserPassword']);
Route::get('/user/find/{id}', [RestApiUserController::class, 'FindUser']);

Route::get('/noticeboard/allOpen', [RestApiNoticeBoardController::class, 'getAllOpenNoticeBoard']);
Route::get('/noticeboard/allClosed', [RestApiNoticeBoardController::class, 'getAllClosedNoticeBoard']);
Route::get('/noticeboard/find/{id}', [RestApiNoticeBoardController::class, 'findNoticeBoardById']);
Route::delete('/noticeboard/delete/{id}', [RestApiNoticeBoardController::class, 'deleteNoticeBoardPost']);
Route::post('/noticeboard/new',[RestApiNoticeBoardController::class,'addNewNoticeBoard']);
Route::patch('/noticeboard/{id}', [RestApiNoticeBoardController::class, 'updateNoticeBoard']);
Route::post('comments/new', [RestApiCommentController::class,'addNewComment']);
Route::patch('/comments/{id}', [RestApiCommentController::class, "editActiveComment"]);


Route::get('qna',[RestApiQnAController::class, 'getAllQuestions']);

Route::get('qna/{id}',[RestApiQnAController::class, 'getSingleQuestion']);

Route::patch('qna/{id}',[RestApiQnAController::class, 'editQuestion']);
Route::get('/qna',[RestApiQnAController::class, 'getAllQuestions']);
Route::delete('/qna/{id}', [RestApiQnAController::class, 'deleteQuestion']);

