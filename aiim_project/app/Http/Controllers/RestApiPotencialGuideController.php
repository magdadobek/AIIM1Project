<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PotencialGuide;
use Illuminate\Support\Facades\DB;
use JWTAuth;
use Illuminate\Support\Facades\Validator;


class RestApiPotencialGuideController extends Controller
{
    public function getAll()
{
    $potencialGuides = PotencialGuide::select('kierunek', 'wydzial', 'semestr')->get();

    return response()->json(['data' => $potencialGuides], 200);
}

public function sendForm(Request $request)
{
    $validator = Validator::make($request->all(), [
        'kierunek' => 'required',
        'wydzial' => 'required',
        'semestr' => 'required',
    ]);


    $token = $request->input('token');

    try {
        $decodedToken = JWTAuth::parseToken($token)->authenticate();
    } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
        ], 401);
    }

    $userId = $decodedToken->id;

    PotencialGuide::create([
        'id_user' => $userId,
        'kierunek' => $request->input('kierunek'),
        'wydzial' => $request->input('wydzial'),
        'semestr' => $request->input('semestr'),
    ]);

    return response()->json(['message' => 'Dane zostały zapisane pomyślnie.']);
}

}
