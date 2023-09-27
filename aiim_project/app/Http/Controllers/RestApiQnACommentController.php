<?php

namespace App\Http\Controllers;

use App\Http\Requests\QnACommentRequest;
use App\Models\QnAComments;
use Illuminate\Http\Request;

class RestApiQnACommentController extends Controller
{
    public function editActiveComment(QnACommentRequest $commentRequest, int $id) {
        $validatedComment = $commentRequest->validated();

        $comment = QnAComments::find($id);

        if(!$comment) {
            return response()
                ->json(['message' => 'Komentarz nie istnieje!'])
                ->setStatusCode(404);
        }

        if ($comment->id_user != auth()->user()->id) {
            return response()
            ->json(['message' => 'Nie jesteś twórcą tego komentarza'])
            ->setStatusCode(403);
        }
        $comment->content = $validatedComment['content'];
        $comment->save();

        return response()
            ->json(['message' => 'Komentarz został zaktualizowany'])
            ->setStatusCode(200);
    }
}