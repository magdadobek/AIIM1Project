<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NoticeBoard;

class RestApiNoticeBoardController extends Controller
{
    //

    public function getAllNoticeBoard(){
        $posts = NoticeBoard::all();
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
}


