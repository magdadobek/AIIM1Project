<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FullNameRequest;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class RestApiNotification extends Controller
{
    public function showByUserId(Request $request){
        $data = $request;
        
        $token = $data['token'];
        try {
                  $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
                  return response()->json([
                      'status' => 'error',
                      'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
                  ], 401);
        }

        $userId=$decodedToken->id;
        $notifications = Notifications::find($userId);


    }
 
}