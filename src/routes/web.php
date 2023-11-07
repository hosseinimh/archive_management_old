<?php

use App\Http\Controllers\User\MemberController;
use App\Http\Controllers\User\ShareActionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('users/logout', [UserController::class, 'logout']);

// 'user' | 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(
    function () {
        Route::get('members/print', [MemberController::class, 'print']);
        Route::get('share_actions/print/page1/{oid}/{m}', [ShareActionController::class, 'printPage1']);
    }
);

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');
