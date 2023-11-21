<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Guide;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Validation\Validator;
use App\Http\Requests\UserRequest;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class RestApiUserController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth:api', ['except' => ['LoginUser']]); // <- do ustawienia po skończeniu prze frontend logowania
        $this->middleware('auth:api', ['except' => ['LoginUser','NewUser','FindUser','UpdateUserAll', 'UpdateUserPassword', 'DeleteUser']]);
        //możliwość użycia funkcji bez podawania tokena bearer token zwracanej w api logowania, funkcje które wymagają to tylko:
        //-LogoutUser
        //-refreshUser
        //będzie można zmienić po skończeniu testów aplikacji, lub dodaniu przez front logowania
    }

    //Wyszukiwanie użytkownika po id - logowanie / zmiana hasła
    public function FindUser($id, Request $request){

        $token = $request['token'];
        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }

        $message="Oto dane uzytkownika o id: $id";
        $user=User::find($id);
        $data=["data"=>$user];
        return response()->json(['data'=>$user, 'message'=>$message]);
    }

    public function FindAll(Request $request){

        $token = $request['token'];
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

        if($accountType=='A'){

            // Wyszukanie użytkowników i posortowanie ich
            $users = User::orderBy('account_type')->get();
            return response()->json(['data'=>$users, 'status' => 'success'], 200);

        }
        else
            return response()->json([
                'status' => 'error',
                'message' => 'Nie masz wystarczających permisji!',
            ], 402);
    }

    //Logowanie użytkownika
    public function LoginUser(UserRequest $request){
        $message="Zle dane logowania";
        $success = false;

        $data = $request->validated();

        $credentials = $request->only('email', 'password');

        //sprawdzanie po email i password
        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();    
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function LogoutUser()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Wylogowano',
        ]);
    }

    //Rejestracja nowego użytkownika
    //każdy nowy użytkownik dostaje account type U - user
    //zmiana account type do przedyskutowania
    // G - guide
    // A - admin
    public function NewUser(UserRequest $request)
    {
        $message="Dodano uzytkownika";
        $data = $request->validated();

        $user = User::create([
            'nickname' => $request->nickname,
            'email' => $request->email,
            'index' => $request->index,
            'password' => Hash::make($request->password),
            'account_type' => 'U',
        ]);

        //$token = Auth::login($user);

        return response()->json([
            'status' => 'success',
            'message' => 'Dodano uzytkownika',
            'user' => $user,
        ]);
    }

    //unieważnia token uwierzytelniania użytkownika i generuje nowy token
    public function refreshUser()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    //Zmiana danych użytkownika przez (docelowo) admina, można dodać jeżeli puste - nie zmieniaj (do dogadania)
    public function UpdateUserAll($id, UserRequest $request){

        $token = $request['token'];
        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }

        $accType=$decodedToken->account_type;

        if($accType!="A" || $accType!="G"){
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, nie jesteś adminem lub guidem.',
            ], 400);
        }

        $data = $request->validated();
        $user = User::find($id);
        if($user != null){
            $message="Zaktualizowano dane uzytkownika o id: $id";
            $user->nickname = $data['nickname'];
            $user->index = $data['index'];
            $user->email = $data['email'];
            $user->password = Hash::make($data['password']);
            $user->account_type = $data['account_type'];
            $user->save();
            return response()->json(['data' => $user, 'message'=>$message]);
        } else
            response()->json(['data' => []]);
    }

    //Zmiana hasła usera
    public function UpdateUserPassword($id, UserRequest $request){
        $message="Zaktualizowano hasło uzytkownika o id: $id";
        $data = $request->validated(); // <- do edycji validacja, pozwalająca na zmiane pojedyńczych danych
        $user = User::find($id);
        if($user != null){
            $user->password = Hash::make($data['password']);
            $user->save();
            return response()->json(['data' => $user, 'message'=>$message]);
        } else
            response()->json(['data' => []]);
    }

    //Zmiana account type
    public function UpdateAccountType($id, Request $request){
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

        $accType=$decodedToken->account_type;

        if($accType!="A" && $accType!="G"){
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, nie posiadasz wystarczającej permisji.',
            ], 400);
        }

        $message="Zaktualizowano account type uzytkownika o id: $id";
        $user = User::find($id);

        if($user==null){
            return response()->json([
                'status' => 'error',
                'message' => 'Brak użytkownika o tym podanym id',
            ], 404);
        }


        if(strlen($data['account_type']) === 1 && preg_match('/^[a-zA-Z]$/', $data['account_type'])){
            $user->account_type = $data['account_type'];
            $user->save();

            return response()->json(['data' => $user, 'message'=>$message], 200);
        } else
            return response()->json(['status' => 'error', 'message'=>'Wrong account_type!'], 400);
    }

    //usuwanie użytkownika po id
    public function DeleteUser($id, Request $request){

        $token = $request['token'];
        try {
            $decodedToken = JWTAuth::parseToken($token)->authenticate();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }

        $accType=$decodedToken->account_type;

        if($accType!="A"){
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, nie jesteś adminem.',
            ], 400);
        }

        $message="Usunięto uzytkownika o id: $id";
        $user=User::find($id);
        if($user!=null){
            $user->delete();
            return response()->json(['data'=>$user, 'message'=>$message]);
        }
        else return response()->json(['data'=>[]]);
    }
}
