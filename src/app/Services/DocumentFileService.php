<?php

namespace App\Services;

use App\Models\Document as Model;

class DocumentFileService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getAll(int $documentId): mixed
    {
        return Model::where('document_id', $documentId)->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->get();
    }

    public function store(string $name, ?string $description, int $documentId, int $userId): mixed
    {
        $data = [
            'name' => $name,
            'description' => $description,
            'document_id' => $documentId,
            'user_id' => $userId,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    public function update(Model $model, string $name, ?string $description, int $documentId, int $userId): bool
    {
        $data = [
            'name' => $name,
            'description' => $description,
            'document_id' => $documentId,
            'user_id' => $userId,
        ];
        $model = Model::create($data);
        return $model->update($data);
    }

    public function count(): int
    {
        return Model::count();
    }
}
