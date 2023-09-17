<?php

namespace App\Http\Controllers;

use App\Models\QnA;
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

    public function getSingleQuestion($questionID) {
        $question = QnA::find($questionID);

        if($question !== null) {
            return response()
                ->json([
                    "message" => "Oto dane odnośnie pytania o id: $questionID",
                    "data" => $question
                ])
                ->setStatusCode(200);
        }
        else {
            return response()
                ->json([
                    "message" => "Nie znaleziono pytania o podanym ID",
                    "data" => ''
                ])
                ->setStatusCode(404);
        }
    }
}
