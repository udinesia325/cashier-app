<?php

use App\Http\Controllers\Api\AuthController;
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
Route::controller(ProductController::class)->group(function () {
    Route::get("/products/{products}", "show");
    Route::get("/products", "index");
    Route::middleware('jwt')->group(function () {
        Route::post("/products", "store");
    });
});


Route::any("/{any}", function () {
    return response()->json([
        "status" => false,
        "message" => "not found"
    ], 404);
});
