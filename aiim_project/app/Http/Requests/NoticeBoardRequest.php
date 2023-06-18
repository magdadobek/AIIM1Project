<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NoticeBoardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    // public function authorize()
    // {
    //     return false;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id_user' => 'required',
            'date' => 'required|date',
            'title' => 'required|min:3',
            'content' => 'required|min:3',
            'open' => 'required|boolean',
            'tags' => 'required|json',
        ];
    }

    // validation error handling
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'errors'    => $validator->errors()
        ], 422));
    }


    public function messages()
    {
        return [
            'id_user.required' => 'Field id_user is required',
            'date.required' => 'Field date is required',
            'title.required' => 'Field title is required',
            'content.required' => 'Field content is required',
            'open.required' => 'Field open is required',
            'content.required' => 'Field content is required',
            'tags.required' => 'Field tags is required',
        ];
    }
}
