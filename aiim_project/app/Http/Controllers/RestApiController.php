<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FullNameRequest;

class RestApiController extends Controller
{
    public function showWelcome()
 {
    return response()->json([
      'data'=> [
         "message"=> "Hello!"
    ],
   ]);
 }
 
}