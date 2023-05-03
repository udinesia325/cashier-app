<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\HistoriesController;
use App\Http\Controllers\Api\InvoicesController;
use App\Http\Controllers\Api\ProductController;
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
        Route::post('login', 'login')->withoutMiddleware("jwt")->name("api.auth.login");
        Route::post('register', 'register')->withoutMiddleware("jwt")->name("api.auth.register");
        Route::post('activate', 'activate')->name("api.auth.activate");
        Route::post('logout', 'logout')->name("api.auth.logout");
        Route::post('refresh', 'refresh')->name("api.auth.refresh");
        Route::post('me', 'me')->name("api.auth.me");
    });
});


Route::middleware("jwt")->group(function () {
    //for products
    Route::apiResource("products", ProductController::class, ["as" => "api"])->missing(function () {
        return response()->json([
            "status" => false,
            "message" => "not found",
            "data" => null
        ], 404);
    });

    // for invoices
    Route::apiResource("invoices", InvoicesController::class, ["as" => "api"])->missing(function () {
        return response()->json([
            "status" => false,
            "message" => "not found",
            "data" => null
        ], 404);
    });

    //for histories
    Route::controller(HistoriesController::class)->group(function () {
        Route::get("/histories", "index")->name("api.histories.index");
        Route::get("/histories/{history}", "show")->missing(function () {
            return response()->json([
                "status" => false,
                "message" => "not found",
                "data" => null
            ], 404);
        })->name("api.histories.show");
    });

    // for dashboard
    Route::get("/dashboard", DashboardController::class)->name("api.dashboard");
});
