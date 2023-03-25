<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HistoriesResource;
use App\Models\History;
use Illuminate\Http\Request;

class HistoriesController extends Controller
{
    //
    public function index()
    {

        $histories = HistoriesResource::collection(History::with('invoice')->paginate(config("app.data_per_page")));

        $histories->with = [
            "status" => true,
            "message" => "Histories",
        ];
        return $histories;
    }
    public function show(History $history)
    {
        return $this->response($history->with('invoice')->first());
    }
}
