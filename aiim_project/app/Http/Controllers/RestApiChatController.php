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
use Illuminate\Support\Facades\Notification;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class RestApiChatController extends Controller
{

    // funkcja wymaga poprawki (3 punkt na zdjęciu pseudocykliczności na dc backu)
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
            
            // do ustalenia czy guide też może zamknąć czat
            $guide = Guide::find($chatToClose->id_guide);
    
            if ($guide == null) {
                return response()
                    ->json(['message' => 'Wolontariusz nie istnieje!'])
                    ->setStatusCode(404);
            }
            
            $questioner->notify(new CloseChatNotification($chatToClose->id_user));
            $guide->notify(new CloseChatNotification($chatToClose->id_guide));

            Notification::send($questioner, new CloseChatNotification($questioner->id));
            Notification::send($guide, new CloseChatNotification($guide->id));
            return response()
                ->json(['message'=> 'Powiadomienia zostały wysłane pomyślnie!'])
                ->setStatusCode(200);
    
        }
    }

    public function closeChat($chatId){
        $chat = Chat::find($chatId);

        if (!$chat) {
            return response()->json(['message' => 'Czat nie istnieje'], 404);
        }

        $chat->open = false;
        $chat->closed_at = Carbon::now();
        $chat->save();

        return response()->json(['message' => 'Czat został zamknięty'], 200);
    }

    public function closeChatOnClick($chatId, Request $request){

        $data = $request;

        $token = $data['token'];
        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }

        $chat = Chat::find($chatId);

        if (!$chat) {
            return response()->json(['message' => 'Czat nie istnieje'], 404);
        }

        $userId=$decodedToken->id;
        $user = User::find($userId);
        $accountType = $user->account_type;
        
        if($chat->id_user==$userId||$accountType=='A'||$chat->id_guide==$userId){
            $chat->open = false;
            $chat->closed_at = Carbon::now();
            $chat->save();

            return response()->json(['status' => 'success', 'message' => 'Czat został zamknięty'], 200);
        }
        else
            return response()->json([
                'status' => 'error',
                'message' => 'Nie masz permisji do zamknięcia tego chatu!',
            ], 402);
    }


// do tej funkcji będzie trzeba wrócić, jak zostanie rozwiązana funkcjonalność powiadomień
/*
    public function checkIfChatHasGuide($chatId, $clickerId){

        if(Chat::find($chatId)->id_guide == null || Chat::find($chatId)->id_guide == $clickerId){
            openChatFirstTime($clickerId, $chatId);
        }
        else{
            return response()->json(['message' => 'Czat jest już obsługiwany przez innego wolontariusza'], 404);
        }
    }
    */

    public function assignGuideToChat(Request $request){
        $data = $request;
        
        $token = $data['token'];
        try {
                  $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
                  return response()->json([
                      'status' => 'error',
                      'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
                  ], 401);
        }

        $userId=$decodedToken->id;
        $user = User::find($userId);
        $accountType = $user->account_type;

        if($accountType != 'G'){
            return response()->json([
                'status' => 'error',
                'message' => 'Nie masz permisji do przypisania się do chatu!',
            ], 402);
        }

        $chatId = $data['chat_id'];
        $chat = Chat::find($chatId);

        if (!$chat) {
            return response()->json([
                'status' => 'error',
                'message' => 'Czat nie istnieje'], 404);
        }

        if($chat->id_guide != null)
        {
            return response()->json([
                'status' => 'conflict',
                'message' => 'Podany chat ma już przypisanego wolontariusza',
            ], 409);
        }

        $chat->guide_id = $userId;
        $chat->save();

        return response()->json([
                'status' => 'success',
                'message' => "Przypisano urzytkownika do chatu",
            ], 200);
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

    //Wszyscy aktywni wolontariusze dostają powiadomienie
    public function notifyGuides(){
        $guides = Guide::where('active', '=', true)->get();
        foreach ($guides as $guide) {
            $guide->notify(new OpenChatNotification);
            Notification::send($guide, new CloseChatNotification($guide->id));
        }
    }

    public function createChat(ChatRequest $request){

        $validatedData = $request->validated();

        $token = $validatedData['token'];
        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }

        // Wywołanie funkcji z pseudocykliczności
        $this->setOldChatsToClose();
        $this->closeAllOldChats();

        $chat = new Chat();

        $date = date('Y-m-d H:i:s');
 
        $chat->id_user = $decodedToken->id;
        $chat->edited_at = $date;
        $chat->created_at = $date;
        $chat->open = true;
        $chat->id_guide = null;
        $chat->closed_at = null;
        $chat->to_close = false;

        $chat->save();

        $chatID = $chat->id;

        if($request->message!=null){
            $message = new Message();
            $message->id_user = $decodedToken->id;
            $message->sender_type = 'U';
            $message->id_chat = $chatID;
            $message->content = $request->message;
            $message->send_at = $date;

            $message->save();
        }

        $this->notifyGuides();
        
        $this->deleteClosedChats();

        if($request->message!=null){
            return response()->json(
                [
                    'status' => 'success',
                    'message' => "Utworzono chat",
                    'data_chat' => $chat,
                    'data_message' => $message,
                ], 200);
        }

        return response()->json(
            [
                'status' => 'success',
                'message' => "Utworzono chat",
                'data_chat' => $chat
            ], 200);

    }

    public function getChatMessages(Request $request, $chatId)
    {
        $data = $request;
        
        $token = $data['token'];
        try {
                  $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
                  return response()->json([
                      'status' => 'error',
                      'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
                  ], 401);
        }

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

    public function showChats(Request $request)
    {
        $data = $request;

        $token = $data['token'];
        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }

        $userId=$decodedToken->id;
        $user = User::find($userId);

        if(!$user) {
            return response()->json(['message' => 'Użytkownik nie istnieje'], 404);
        }

        $accountType = $user->account_type;
        switch ($accountType) {
            case 'A':
                $chats = Chat::all();
                break;

            case 'G':
                $chats = Chat::where(function ($query) use ($userId) {
                    $query->where('id_user', $userId)
                        ->orWhere('id_guide', $userId)
                        ->orWhere('id_guide', null);
                })->get();
                break;

            case 'U':
                $chats = Chat::where('id_user', $userId)->get();
                break;
    
            default:
                return response()->json(['message' => 'Użytkownik niepoprawny'], 404);
        };

        if($chats->isEmpty()){
            return response()->json(['message' => 'Nie masz żadnych chatów do wyświetlenia', 204]);
        }
        else{

            foreach ($chats as $chat) {
                $idChat = $chat->id;

                // Pobierz pierwszą i ostatnią wiadomość dla danego id_chat
                $firstMessage = Message::where('id_chat', $idChat)->orderBy('send_at')->first();
                $lastMessage = Message::where('id_chat', $idChat)->orderBy('send_at', 'desc')->first();

                if($firstMessage!=null){
                    $userFirst = User::find($firstMessage->id_user);
                    $firstMessage->nickname = $userFirst->nickname;  
                    $userLast = User::find($lastMessage->id_user);
                    $lastMessage->nickname = $userLast->nickname;  
                }

                $chat->user_nickname = $user->nickname;

                if($chat->id_guide!=null){
                    $guide = Guide::find($chat->id_guide);
                    $userGuide = User::find($guide->id_user);
                    $chat->guide_nickname = $userGuide->nickname;
                } 
                else
                    $chat->guide_nickname = null;

                $chat->firstMessage = $firstMessage;
                $chat->lastMessagee = $lastMessage;
            }

            $chats = $chats->sortBy('edited_at');
            return response()->json(['data' => $chats->values()], 200);
        }
     }

    private function getDiffInDaysFromNow($date) {
        $current_date = Carbon::now();
        $editDate = Carbon::parse(date('Y-m-d', strtotime($date))); 
        $diffDays = $editDate->diffInDays($current_date);
        return $diffDays;
    }

    // Punkt 2 z pseudocykliczności
    private function closeAllOldChats(){
        $chats = Chat::all();
        foreach ($chats as $chat) {
            $daysSinceLastEdit = $this->getDiffInDaysFromNow($chat->edited_at);
            if ($daysSinceLastEdit >= 10 && $chat->to_close) {
                $this->closeChat($chat->id);
            }
        }
    }

  
    // Punkt 3 z pseudocykliczności
    private function setOldChatsToClose(){
        $chats = Chat::all();
        foreach ($chats as $chat) {
            $daysSinceLastEdit = $this->getDiffInDaysFromNow($chat->edited_at);
            if ($daysSinceLastEdit >= 7 && !$chat->to_close) {
                $chat->to_close = true;
                $this->askToCloseChat($chat->id);
            }
        }
    }
      
    public function deleteChatMessage(Request $request)
    {
        $data = $request;
        $chatId = $data['chat_id'];
        $messageId = $data['message_id'];

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

        $message = Message::where('id', $messageId)
                  ->where('id_user', $userId)
                  ->where('id_chat', $chatId)
                  ->first();

        if (!$message) {
                  return response()->json(['message' => 'Nie możesz usunąć tej wiadomości'], 403);
        }

        $message->content = 'wiadomość została usunięta';
        $message->save();

        return response()->json(['message' => 'Wiadomość została usunięta'], 200);
    }

}
