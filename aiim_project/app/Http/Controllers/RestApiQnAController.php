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
                ->setStatusCode(404);
        }
    }

    public function deleteQuestion(int $questionId){
        $questionToDelete = QnA::find($questionId);

        if ($questionToDelete === null) {
            return response()
                ->json(["message" => "Pytanie z podanym ID nie istnieje"])
                ->setStatusCode(404);
        }
        else {
            $questionToDelete->delete();
            return response()
                ->json(["message" => "Pytanie zostało usunięte pomyślnie!"])
                ->setStatusCode(200);
        }
    }
}
