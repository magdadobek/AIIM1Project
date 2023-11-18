<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestApiController;
use App\Http\Controllers\RestApiUserController;
use App\Http\Controllers\RestApiNoticeBoardController;
use App\Http\Controllers\RestApiCommentController;
use App\Http\Controllers\RestApiQnACommentController;
use App\Http\Controllers\RestApiQnAController;
use App\Http\Controllers\RestApiChatController;

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

Route::get('/user/findAll', [RestApiUserController::class, 'FindAll']);

Route::get('/user/login', [RestApiUserController::class, 'LoginUser']);
Route::get('/user/logout', [RestApiUserController::class, 'LogoutUser']);
Route::post('/user/new',[RestApiUserController::class,'NewUser']);
Route::post('/user/refresh',[RestApiUserController::class,'refreshUser']);
Route::delete('/user/delete/{id}', [RestApiUserController::class, 'DeleteUser']);
Route::patch('/user/update/all/{id}', [RestApiUserController::class, 'UpdateUserAll']);
Route::patch('/user/update/password/{id}', [RestApiUserController::class, 'UpdateUserPassword']);
Route::patch('/user/update/accountType/{id}', [RestApiUserController::class, 'UpdateAccountType']);
Route::get('/user/find/{id}', [RestApiUserController::class, 'FindUser']);

Route::get('/noticeboard/allOpen', [RestApiNoticeBoardController::class, 'getAllOpenNoticeBoard']);
Route::get('/noticeboard/allClosed', [RestApiNoticeBoardController::class, 'getAllClosedNoticeBoard']);
Route::get('/noticeboard/find/{id}', [RestApiNoticeBoardController::class, 'findNoticeBoardById']);
Route::delete('/noticeboard/delete/{id}', [RestApiNoticeBoardController::class, 'deleteNoticeBoardPost']);
Route::post('/noticeboard/new',[RestApiNoticeBoardController::class,'addNewNoticeBoard']);
Route::patch('/noticeboard/{id}', [RestApiNoticeBoardController::class, 'updateNoticeBoard']);

Route::get('/noticeboard/showComments/{id}', [RestApiNoticeBoardController::class, 'getAllComments']);
Route::post('comments/new', [RestApiCommentController::class,'addNewComment']);
Route::patch('/comments/{id}', [RestApiCommentController::class, "editActiveComment"]);
Route::delete('/comments/delete/{id}', [RestApiCommentController::class, "deleteComment"]);

Route::get('/qna',[RestApiQnAController::class, 'getAllQuestions']);
Route::get('/qna/{id}',[RestApiQnAController::class, 'getSingleQuestion']);
Route::post('/qna/new',[RestApiQnAController::class,'addNewQuestion']);
Route::patch('/qna/{id}',[RestApiQnAController::class, 'editQuestion']);
Route::delete('/qna/{id}', [RestApiQnAController::class, 'deleteQuestion']);

Route::get('/qna/showComments/{id}', [RestApiQnACommentController::class, 'getCommentsFromSingleQnAQuestion']);
Route::patch('/qna/comments/{id}', [RestApiQnACommentController::class, "editActiveComment"]);
Route::delete('/qna/comments/delete/{id}', [RestApiQnACommentController::class, "deleteComment"]);


Route::patch('/chats/closeChat/{id}', [RestApiChatController::class, 'closeChatOnClick']);
Route::post('/chats/createChat',[RestApiChatController::class,'createChat']);
Route::get('/chats/{chatId}/messages', [RestApiChatController::class, 'getChatMessages']);
Route::post('/chats/sendMessage', [RestApiChatController::class, 'sendMessageToChat']);
Route::patch('/chats/deleteMessage', [RestApiChatController::class, 'deleteChatMessage']);
Route::get('/chats/showChats', [RestApiChatController::class, 'showChats']);


