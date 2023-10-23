<?php

namespace App\Http\Controllers;

use App\Models\Guide;
use App\Models\User;
use App\Notifications\CloseChatNotification;
use App\Notifications\OpenChatNotification;
use Illuminate\Http\Request;
use App\Http\Requests\ChatRequest;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

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
            $guide->notify(new CloseChatNotification());

            return response()->setStatusCode(200);
    
        }
    }

    public function closeChat($chatId){
        $chat = Chat::find($chatId);

        if (!$chat) {
            return response()->json(['message' => 'Czat nie istnieje'], 404);
        }

        $chat->open = false;
        $chat->save();

        return response()->json(['message' => 'Czat został zamknięty'], 200);
    }

    public function checkIfChatHasGuide($chatId, $clickerId){

        if(Chat::find($chatId)->id_guide == null || Chat::find($chatId)->id_guide == $clickerId){
            openChat($clickerId, $chatId);
        }
        else{
            return response()->json(['message' => 'Czat jest już obsługiwany przez innego wolontariusza'], 200);
        }
    }

    public function deleteChat($id){
        $chatToRemove = Chat::find($id);

        if (!$chatToRemove) {
            return response()->json(['message' => 'Czat nie istnieje'], 404);
        }

        if ($chatToRemove->open != false) {
            return response()->json(['message' => 'Czat dalej jest otwarty'], 404);
        }

        DB::table('messages')->where('id_chat', '=', $id)->delete();
        DB::table('chats')->where('id', '=', $id)->delete();

        return response()->json(['message' => 'Czat został usunięty'], 200);
    }

    public function createChat(ChatRequest $request){

        $validatedData = $request->validated();

        $chat = new Chat();

        $date = date('Y-m-d H:i:s');
 
        $chat->id_user = $validatedData['id_user'];
        $chat->edited_at = $date;
        $chat->created_at = $date;
        $chat->open = true;
        $chat->id_guide = null;

        $chat->save();

        $chatID = $chat->id;

        $message = new Message();
        $message->id_user = $validatedData['id_user'];
        $message->type_user = 'U';
        $message->id_chat = $chatID;
        $message->content = $request->message;
        $message->send_at = $date;

        $message->save();

        /*

        //Wszyscy wolontariusze dostają powiadomienie, pole informujące o aktywności?
        $guides = Guide::all();
        foreach ($guides as $guide) {
            $guide->notify(new OpenChatNotification);
        }

        //Call to undefined method App\Models\Guide::notify()
        
        */

        return response()->json(
            [
                'status' => 'success',
                'message' => "Utworzono chat",
                'data' => $chat
            ]
        );

    }

    public function getChatMessages($chatId)
    {
        $chat = Chat::with(['messages.user'])
            ->find($chatId);
    
        if (!$chat) {
            return response()->json(['message' => 'Czat nie istnieje'], 404);
        }
    
        $messages = $chat->messages->sortBy('send_at')->map(function ($message) {
            return [
                'id_user' => $message->user->id,
                'sender_type' => $message->sender_type,
                'content' => $message->content,
                'send_at' => $message->send_at,
                'nickname' => $message->user->nickname,
            ];
        });
    
        return response()->json(['data' => $messages->values()], 200);
    }
    
}
