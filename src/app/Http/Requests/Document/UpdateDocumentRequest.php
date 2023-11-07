<?php

namespace App\Http\Requests\Document;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateDocumentRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'document_no' => 'required|unique:tbl_documents,document_no,' . $this->model->id,
            'payment_no' => 'max:50',
            'payment_date' => 'sometimes|numeric|gte:14000101',
            'owner' => 'required|max:50',
            'description' => 'max:1000',
        ];
    }

    public function messages()
    {
        return [
            'document_no.required' => __('document.document_no_required'),
            'document_no.unique' => __('document.document_no_unique'),
            'payment_no.max' => __('document.payment_no_max'),
            'payment_date.numeric' => __('document.payment_date_numeric'),
            'payment_date.gte' => __('document.payment_date_gte'),
            'owner.required' => __('document.owner_required'),
            'owner.max' => __('document.owner_max'),
            'description.max' => __('document.description_max'),
        ];
    }
}
