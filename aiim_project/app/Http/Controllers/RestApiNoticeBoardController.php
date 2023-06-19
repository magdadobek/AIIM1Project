<?php

namespace App\Http\Controllers;

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

    public function deleteNoticeBoardPost($id){

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
}


