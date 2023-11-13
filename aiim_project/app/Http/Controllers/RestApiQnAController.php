<?php

namespace App\Http\Controllers;

use App\Http\Requests\QnARequest;
use App\Models\QnA;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

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

    public function addNewQuestion(QnARequest $request)
    {
        $data = $request->validated();

        // Jak gość?

        $token = $data['token'];

        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }
        $qna = new QnA();

        $qna->id_user = $decodedToken->id;
        $qna->date = date('Y-m-d');
        $qna->question_title = $data['question_title'];
        $qna->question_content = $data['question_content'];
        $qna->open = true;
        $qna->tags = $data['tags'];
        $qna->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Dodano nowe pytanie',
            'data' => $qna
        ], 200);
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
