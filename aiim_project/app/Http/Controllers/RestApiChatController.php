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
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

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

    public function deleteClosedChats(){
        $thresholdDate = Carbon::now()->subDays(3);

        $chatsToRemove = Chat::where('closed_at', '<', $thresholdDate)->get();

        foreach ($chatsToRemove as $chat) {
            DB::table('messages')->where('id_chat', '=', $chat->id)->delete();
            DB::table('chats')->where('id', '=', $chat->id)->delete();
        }

        return response()->json(['message' => 'Usunięto wszystkie czaty i ich wiadomości zamknięte dłużej niż 3 dni temu.']);
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
        $chat->closed_at = null;

        $chat->save();

        $chatID = $chat->id;

        $message = new Message();
        $message->id_user = $validatedData['id_user'];
        $message->sender_type = 'U';
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
        
        deleteClosedChats();



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

    public function sendMessageToChat(Request $request)
    {
        $data = $request;
        $chatId = $data['chat_id'];
        $messageContent = $data['content'];
    
        $token = $data['token'];
        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }
    
        $userId = $decodedToken->id; 
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'Użytkownik nie istnieje'], 404);
        }
    
        $accountType = $user->account_type;
        
        $chat = Chat::where('id', $chatId)
            ->where(function ($query) use ($userId) {
                $query->where('id_user', $userId)
                    ->orWhere('id_guide', $userId);
            })
            ->where('open', true)
            ->first();
    
        if (!$chat) {
            return response()->json(['message' => 'Nie możesz wysłać wiadomości w tym czacie'], 403);
        }
    
        $message = new Message();
        $message->id_user = $userId;
        $message->id_chat = $chatId;
        $message->content = $messageContent;
        $message->send_at = now();
        $message->sender_type = $accountType;
    
        $message->save();

        $chat->to_close = false;
        $chat->save();
    
        return response()->json(['message' => 'Wiadomość wysłana pomyślnie'], 200);
    }
    

    
}
