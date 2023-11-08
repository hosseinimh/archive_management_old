<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\DocumentFile\IndexDocumentFilesRequest;
use App\Models\Document;
use App\Models\DocumentFile as Model;
use App\Packages\JsonResponse;
use App\Services\DocumentFileService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DocumentFileController extends Controller
{
    public function __construct(JsonResponse $response, public DocumentFileService $service)
    {
        parent::__construct($response);
    }

    public function index(Document $document, IndexDocumentFilesRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getAll($document->id), $this->service->count($document->id));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
