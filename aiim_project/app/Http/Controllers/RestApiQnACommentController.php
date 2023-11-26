<?php

namespace App\Http\Controllers;

use App\Http\Requests\QnACommentRequest;
use App\Models\QnA;
use App\Models\User;
use App\Models\QnAComments;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class RestApiQnACommentController extends Controller
{

    public function getCommentsFromSingleQnAQuestion($id)
    {
        $posts = DB::table('qna_comments')->where('id_question', '=', $id)->orderBy('date', 'DESC')->get();
        if($posts!=null){
            foreach ($posts as $post) {
                $user = User::find($post->id_user);
                $post->author_nickname = $user->nickname;
            }
        }
        return response()->json([
            'data' => $posts,
        ]);
    }

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
    
    public function deleteComment(int $id) {
        //$validatedComment = $commentRequest->validated();

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

    public function addNewComment(QnACommentRequest $commentRequest) {
        $validatedComment = $commentRequest->validated();

        $questionID = $validatedComment['id_question'];
        $question = QnA::find($questionID);
        
        if(!$question) {
            return response()
            ->json(['message' => 'Pytanie nie istnieje!'])
            ->setStatusCode(404);
        }
        
        $userID = $validatedComment['id_user'];
        $user = User::find($userID);

        if(!$user) {
            return response()
                ->json(['message' => 'Użytkownik nie istnieje!'])
                ->setStatusCode(404);
        }

        $newComment = new QnAComments();
        $newComment->id_question = $questionID;
        $newComment->id_user = $userID;
        $newComment->content = $validatedComment['content'];
        $newComment->date = Carbon::now()->toDateString();
        $newComment->edited = false;

        $newComment->save();

        return response()
            ->json(['message' => 'Komentarz został dodany'])
            ->setStatusCode(200);

    }
}
