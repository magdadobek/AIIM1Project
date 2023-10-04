<?php

namespace App\Http\Controllers;

use App\Models\Guide;
use App\Models\User;
use App\Notifications\CloseChatNotification;
use Illuminate\Http\Request;
use App\Models\Chat;
use Illuminate\Support\Carbon;

class RestApiChatController extends Controller
{
    public function askToCloseChat(int $chatID){
        $chatToClose = Chat::find($chatID);

        if ($chatToClose === null) {
            return response()
            ->json(['message' => "Chat nie istnieje!"])
            ->setStatusCode(404);
        }

        $current_date = Carbon::now();
        $editDate = Carbon::parse(date('Y-m-d', strtotime($chatToClose->edited_at))); 
        $diffDays = $editDate->diffInDays($current_date);

        if ($diffDays > 3) {

            $questioner = User::find($chatToClose->id_user);

            if ($questioner == null) {
                return response()
                    ->json(['message' => 'Użytkownik nie istnieje!'])
                    ->setStatusCode(404);
            }
            
            $guide = Guide::find($chatToClose->id_guide);
    
            if ($guide == null) {
                return response()
                    ->json(['message' => 'Wolontariusz nie istnieje!'])
                    ->setStatusCode(404);
            }
            
            $questioner->notify(new CloseChatNotification());
            $guide->notify(new CloseChatNotification);

            return response()->setStatusCode(200);
    
        }
    }
}
