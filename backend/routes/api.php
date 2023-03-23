<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InvoicesController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('jwt')->prefix('auth')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login')->withoutMiddleware("jwt")->name("login");
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::post('me', 'me');
    });
});

Route::middleware("jwt")->apiResource("products", ProductController::class, ["as" => "api"])->missing(function () {
    return response()->json([
        "status" => false,
        "message" => "not found",
        "data" => null
    ], 404);
});
Route::middleware("jwt")->apiResource("invoices", InvoicesController::class, ["as" => "api"])->missing(function () {
    return response()->json([
        "status" => false,
        "message" => "not found",
        "data" => null
    ], 404);
});
