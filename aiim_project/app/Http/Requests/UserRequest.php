<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    //public function authorize()
    //{
    //    return false;
    //}

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        switch($this->method()){
            case 'POST':
                return $this->store();
            case 'PUT':
            case 'PATCH':
                return $this->update();
            case 'DELETE':
                return $this->destroy();
            default:
                return $this->view();
        };
    }

    /**
     * Get the validation rules that apply to the get request.
     *
     * @return array
     */
    public function view()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ];
    }
    
    /**
     * Get the validation rules that apply to the post request.
     *
     * @return array
     */
    public function store()
    {
        return [
            'nickname'     => 'required|String|min:3|max:25',
            'index'        => 'required|String|min:5|max:6',
            'email'        => 'required|String|min:3',
            'password'     => 'required|String|min:6'
        ];
    }

    /**
     * Get the validation rules that apply to the put/patch request.
     *
     * @return array
     */
    public function update()
    {
        return [
            'nickname'     => 'String|min:3|max:25',
            'index'        => 'String|min:5|max:6',
            'email'        => 'String|min:3',
            'password'     => 'required|String|min:6',
            'account_type' => 'String|max:1'
        ];
    }

    /**
     * Get the validation rules that apply to the delete request.
     *
     * @return array
     */
    public function destroy()
    {
        return [
            'id' => 'required|integer|exists:users,id'
        ];
    }

    // validation error handling
    public function failedValidation(Validator $validator){
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data'    => $validator->errors()
        ]));
    }

    public function messages()
    {
        return [
            'nickname.required' => 'Field nickname is required',
            'index.required' => 'Field index is required',
            'email.required' => 'Field email is required',
            'password.required' => 'Field password is required'
        ];
    }
}
