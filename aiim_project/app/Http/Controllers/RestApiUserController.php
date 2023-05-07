<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use App\Http\Requests\UserRequest;


class RestApiUserController extends Controller
{
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
        $user = User::where('email', $data['email'])->first();
        if($user != null && $user->email == $data['email'] && $user->password == $data['password']){
            $message="Zalogowano";
            $success = true;
        }
            
        return response()->json(['success'=>$success, 'message'=>$message]);
    }

    //Rejestracja nowego użytkownika
    public function NewUser(UserRequest $request)
    {
        $message="Dodano uzytkownika";
        $data = $request->validated();

        $user = new User();
        $user->nickname = $data['nickname'];
        $user->index = $data['index'];
        $user->email = $data['email'];
        $user->password = $data['password'];
        $user->account_type = $data['account_type'];
        $user->save();

        return response()->json(['data'=>$user, 'message'=>$message]);

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
            $user->password = $data['password'];
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
            $user->password = $data['password'];
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
}
