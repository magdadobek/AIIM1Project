<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestApiQnAController extends Controller
{
    public function getAllQuestions() {
        $questions = DB::table('qna')
            ->orderByDesc('date')
            ->get();
        if ($questions !== null) {
            return response()
                ->json(['data' => $questions]);
        }
        else {
            return response()
                ->json(['data' => 'brak pytan'])
                ->status(404);
        }
    }
}
