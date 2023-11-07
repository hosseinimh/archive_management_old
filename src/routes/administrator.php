<?php

use App\Http\Controllers\Administrator\DocumentController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\SettingsController;
use App\Http\Controllers\Administrator\UserController;
use Illuminate\Support\Facades\Route;

// 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.administrator'])->group(function () {
    Route::post('errors', [ErrorController::class, 'index']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{model}', [UserController::class, 'show']);
    Route::post('users/store', [UserController::class, 'store']);
    Route::post('users/update/{model}', [UserController::class, 'update']);
    Route::post('users/change_password/{model}', [UserController::class, 'changePassword']);

    Route::post('settings/update', [SettingsController::class, 'update']);

    Route::post('documents/store', [DocumentController::class, 'store']);
    Route::post('documents/update/{model}', [DocumentController::class, 'update']);
});
