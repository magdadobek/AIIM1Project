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
}
