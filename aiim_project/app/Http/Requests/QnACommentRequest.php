<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class QnACommentRequest extends FormRequest
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
            'id_question' => 'required|integer',
            'id_user' => 'required|integer',
            'date' => 'required|date',
            'content' => 'required|min:3',
            'edited' => 'required|boolean'
        ];
    }

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
            'id_question.required' => 'Field id_question is required',
            'id_question.integer' => 'Field id_question must be an integer',
            'id_user.required' => 'Field id_user is required',
            'id_user.integer' => 'Field id_user must be an integer',
            'date.required' => 'Field date is required',
            'date.date' => 'Field date must be a date in format YYYY-MM-DD',
            'content.required' => 'Field content is required',
            'content.min' => 'Content must have at least 3 characters',
            'open.required' => 'Field open is required',
            'open.boolean' => 'Field open must be a boolean',
        ];
    }
}
