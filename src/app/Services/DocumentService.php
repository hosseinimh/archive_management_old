<?php

namespace App\Services;

use App\Models\Document as Model;

class DocumentService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')->where('tbl_documents.id', $id)->select('tbl_documents.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->first();
    }

    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')->select('tbl_documents.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->orderBy('tbl_documents.created_at', 'DESC')->orderBy('tbl_documents.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $documentNo, ?string $paymentNo, ?string $paymentDate, string $owner, ?string $description, int $userId): mixed
    {
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : null;
        $data = [
            'document_no' => $documentNo,
            'payment_no' => $paymentNo,
            'payment_date' => $paymentDate,
            'owner' => $owner,
            'description' => $description,
            'user_id' => $userId,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $documentNo, ?string $paymentNo, ?string $paymentDate, string $owner, ?string $description, int $userId): bool
    {
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : null;
        $data = [
            'document_no' => $documentNo,
            'payment_no' => $paymentNo,
            'payment_date' => $paymentDate,
            'owner' => $owner,
            'description' => $description,
            'user_id' => $userId,
        ];
        return $model->update($data);
    }

    public function count(): int
    {
        return Model::count();
    }
}
