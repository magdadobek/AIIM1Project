<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Validation\Validator;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Notification;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use App\Notifications\SendFormNotification;




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
    public function FindUser($id){
        $message="Oto dane uzytkownika o id: $id";
        $user=User::find($id);
        $data=["data"=>$user];
        return response()->json(['data'=>$user, 'message'=>$message]);
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
            //'password' => $request->password,
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

    //usuwanie użytkownika po id
    public function DeleteUser($id){
        $message="Usunięto uzytkownika o id: $id";
        $user=User::find($id);
        if($user!=null){
            $user->delete();
            return response()->json(['data'=>$user, 'message'=>$message]);
        }
        else return response()->json(['data'=>[]]);
    }

    public function submitForm(Request $request)
    {
        $data = $request->validate([
            'kierunek' => 'required',
            'wydzial' => 'required',
            'semestr' => 'required',
        ]);

        try {
            $decodedToken = JWTAuth::parseToken()->authenticate();
            $userId = $decodedToken->id;
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Błąd autoryzacji, token nieprawidłowy lub unieważniony',
            ], 401);
        }

        $data['id_user'] = $userId;

        $admins = User::where('account_type', 'A')->get();

        foreach ($admins as $admin) {
            $admin->notify(new SendFormNotification($data));
        }

        return response()->json(['message' => 'Powiadomienia zostały wysłane pomyślnie.']);
    }
}
