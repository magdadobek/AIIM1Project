<?php

namespace App\Http\Controllers;

use App\Http\Requests\QnARequest;
use App\Models\QnA;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestApiQnAController extends Controller
{
    public function getAllQuestions()
    {
        $questions = DB::table('qna')
            ->orderByDesc('date')
            ->get();
        if ($questions !== null) {
            return response()
                ->json(['data' => $questions]);
        } else {
            return response()
                ->json(['data' => 'brak pytan'])
                ->status(404);
        }
    }

    public function editQuestion(QnARequest $request, $questionID)
    {
        $validatedRequest = $request->validated();

        $questionToEdit = QnA::find($questionID);

        if (!$questionToEdit) {
            return response()
                ->json(['message' => 'Pytanie nie istnieje'])
                ->setStatusCode(404);
        }

        if ($questionToEdit->id_user != auth()->user()->id) {
            return response()
                ->json(['message' => 'Nie jesteś autorem tego pytania!'])
                ->setStatusCode(403);
        }

        $questionToEdit->question_title = $validatedRequest['question_title'];
        $questionToEdit->question_content = $validatedRequest['question_content'];
        $questionToEdit->tags = $validatedRequest['tags'];
        $questionToEdit->save();

        return response()
            ->json(['message' => 'Pytanie zostało zaktualizowane!'])
            ->setStatusCode(200);
    }
}
