<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StoreDocumentRequest;
use App\Http\Requests\Document\UpdateDocumentRequest;
use App\Models\Document as Model;
use App\Packages\JsonResponse;
use App\Services\DocumentService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DocumentController extends Controller
{
    public function __construct(JsonResponse $response, public DocumentService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreDocumentRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->document_no, $request->payment_no, $request->payment_date, $request->owner, $request->description, auth()->user()->id));
    }

    public function update(Model $model, UpdateDocumentRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->document_no, $request->payment_no, $request->payment_date, $request->owner, $request->description, auth()->user()->id));
    }
}
