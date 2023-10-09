<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeBoardRequest;
use Illuminate\Http\Request;
use App\Models\NoticeBoard;
use App\Models\Comments;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class RestApiNoticeBoardController extends Controller
{
    //

    public function getAllOpenNoticeBoard()
    {

        $posts = DB::table('notice_board')->where('open', '=', true)->orderBy('date', 'DESC')->get();
        if ($posts != null) {
            $data = ["data" => $posts];
        } else {
            $data = "brak ogloszen";
        }


        return response()->json([
            'data' => $data,
        ]);
    }

    public function getAllClosedNoticeBoard()
    {

        $posts = DB::table('notice_board')->where('open', '=', false)->orderBy('date', 'DESC')->get();
        if ($posts != null) {
            $data = ["data" => $posts];
        } else {
            $data = "brak ogloszen";
        }


        return response()->json([
            'data' => $data,
        ]);
    }

    public function findNoticeBoardById($id)
    {
        $post = NoticeBoard::find($id);

        if ($post != null) {
            $data = ["data" => $post];
        } else {
            $data = "brak ogloszen";
        }

        return response()->json([
            'data' => $data,
        ]);
    }

    public function addNewNoticeBoard(NoticeBoardRequest $request)
    {
        $data = $request->validated();

        $token = $data['token'];
        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }
        $noticeBoard = new NoticeBoard();

        $noticeBoard->id_user = $decodedToken->id;
        $noticeBoard->date = date('Y-m-d');
        $noticeBoard->title = $data['title'];
        $noticeBoard->content = $data['content'];
        $noticeBoard->open = true;
        $noticeBoard->tags = $data['tags'];
        $noticeBoard->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Dodano post',
            'data' => $noticeBoard
        ], 200);
    }

    public function deleteNoticeBoardPost($id)
    {

        $post = NoticeBoard::find($id);

       if ($post === null) {
           $data = "brak ogłoszeń";
       } else {
           $post->delete();
           $data =  "Rekord został pomyślnie usunięty";
       }

       return response()->json([
           'data' => $data,
       ]);
    }

    public function updateNoticeBoard(NoticeBoardRequest $request, $id)
    {
       $validatedData = $request->validated();

        $noticeBoard = NoticeBoard::find($id);

        if (!$noticeBoard) {
            return response()->json(['message' => 'Post nie istnieje'], 404);
        }

        if ($noticeBoard->id_user != auth()->user()->id) {
            return response()->json(['message' => 'Nie jesteś twórcą tego posta'], 403);
        }

        $noticeBoard->title = $validatedData['title'];
        $noticeBoard->content = $validatedData['content'];
        $noticeBoard->tags = $validatedData['tags'];
        $noticeBoard->save();

        return response()->json(['message' => 'Post został zaktualizowany'], 200);
    }

    public function getAllComments($id)
    {
        $posts = DB::table('comments')->where('id_notice', '=', $id)->orderBy('date', 'DESC')->get();
        return response()->json([
            'data' => $posts,
        ]);
    }

}
