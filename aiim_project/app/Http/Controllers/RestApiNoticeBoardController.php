<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeBoardRequest;
use Illuminate\Http\Request;
use App\Models\NoticeBoard;
use Illuminate\Support\Facades\DB;

class RestApiNoticeBoardController extends Controller
{
    //

    public function getAllOpenNoticeBoard(){

        $posts = DB::table('notice_board')->where('open','=', true)->orderBy('date','DESC')->get();
        if($posts != null){
            $data = ["data"=>$posts];
        }
        else
        {
            $data = "brak ogloszen";
        }


        return response()->json([
            'data' => $data,
            ]);
    }

    public function getAllClosedNoticeBoard(){

        $posts = DB::table('notice_board')->where('open','=', false)->orderBy('date','DESC')->get();
        if($posts != null){
            $data = ["data"=>$posts];
        }
        else
        {
            $data = "brak ogloszen";
        }


        return response()->json([
            'data' => $data,
            ]);
    }

    public function findNoticeBoardById($id){
        $post = NoticeBoard::find($id);

        if($post != null){
            $data = ["data"=>$post];
        }
        else{
            $data = "brak ogloszen";
        }

        return response()->json([
            'data' => $data,
            ]);
    }

    public function addNewNoticeBoard(NoticeBoardRequest $request)
    {
        $data = $request->validated();

        $noticeBoard = new NoticeBoard();

        $noticeBoard->id_user = $data['id_user'];
        $noticeBoard->date = $data['date'];
        $noticeBoard->title = $data['title'];
        $noticeBoard->content = $data['content'];
        $noticeBoard->open = $data['open'];
        $noticeBoard->tags = $data['tags'];
        $noticeBoard->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Dodano post',
            'data' => $noticeBoard
        ],200);
    }

}


