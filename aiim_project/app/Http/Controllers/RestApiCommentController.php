<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comments;
use Illuminate\Http\Request;

class RestApiCommentController extends Controller
{
    public function addNewComment(CommentRequest $request) {
        $validatedData = $request->validated();

        $comment = new Comments();

        $comment->id_notice = $validatedData['id_notice'];
        $comment->id_user = $validatedData['id_user'];
        $comment->date = $validatedData['date'];
        $comment->content = $validatedData['content'];
        $comment->edited = $validatedData['edited'];

        $comment->save();

        return response()->json(
            [
                'status' => 'success',
                'message' => "Dodano komentarz",
                'data' => $comment
            ]
        );
    }

    public function editActiveComment(CommentRequest $commentRequest, int $id) {
        $validatedComment = $commentRequest->validated();

        $comment = Comments::find($id);

        if(!$comment) {
            return response()->json(['message' => 'Komentarz nie istnieje!'],404);
        }
        $comment->content = $validatedComment['content'];
        $comment->save();

        return response()->json(['message' => 'Komentarz został zaktualizowany'],200);
    }

    public function deleteComment(CommentRequest $commentRequest, int $id) {
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
        $comment->delete();

        return response()
            ->json(['message' => 'Komentarz został usunięty'])
            ->setStatusCode(200);
    }
}
