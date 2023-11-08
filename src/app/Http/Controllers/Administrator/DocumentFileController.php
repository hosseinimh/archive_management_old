<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\StoragePath;
use App\Constants\UploadedFile;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FileUploaderController;
use App\Http\Requests\DocumentFile\StoreDocumentFileRequest;
use App\Http\Requests\DocumentFile\UpdateDocumentFileRequest;
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

    public function store(Document $document, StoreDocumentFileRequest $request): HttpJsonResponse
    {
        $result = $this->service->store($request->description, $document->id, auth()->user()->id);
        if ($result) {
            $uploadResult = (new FileUploaderController(StoragePath::DOCUMENT_FILE))->uploadFile($result, $request, 'file', 'path', 4 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/tiff', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
            if ($uploadResult !== UploadedFile::OK) {
                $this->service->delete($result);
            }
        }
        return $this->onItems($this->service->getAll($document->id), $this->service->count($document->id));
    }

    public function update(Model $model, UpdateDocumentFileRequest $request): HttpJsonResponse
    {
        $this->service->update($model, $request->description, auth()->user()->id);
        return $this->onItems($this->service->getAll($model->document_id), $this->service->count($model->document_id));
    }

    public function delete(Model $model): HttpJsonResponse
    {
        $this->service->delete($model);
        return $this->onItems($this->service->getAll($model->document_id), $this->service->count($model->document_id));
    }
}
