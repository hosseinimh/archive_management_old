<?php

namespace App\Http\Requests\DocumentFile;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreDocumentFileViaScanRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'document_id' => 'required|numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'document_id.required' => __('document_file.document_id_required'),
            'document_id.numeric' => __('document_file.document_id_numeric'),
            'document_id.gt' => __('document_file.document_id_gt'),
        ];
    }
}
