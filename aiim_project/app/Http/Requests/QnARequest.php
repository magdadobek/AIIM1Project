<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class QnARequest extends FormRequest
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
            'token' => 'required',
            'question_title' => 'required|min:3',
            'question_content' => 'required|min:3',
            'tags' => 'required|array|min:1',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'errors'  => $validator->errors()
        ], 422));
    }


    public function messages()
    {
        return [
            'token.required' => 'Token is required',
            'question_title.required' => 'Field title is required',
            'question_title.min' => 'Field title must have at least 3 characters',
            'question_content.required' => 'Field content is required',
            'question_content.min' => 'Field content must have at least 3 characters',
            'tags.required' => 'Tags are required',
            'tags.array' => 'Field tags must be an array',
            'tags.min' => 'There must be at least 1 tag in array'
        ];
    }
}
