<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Models\Invoice;
use App\Rules\InvoiceJsonRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InvoicesController extends Controller
{
    public function index()
    {
        $data = Invoice::all();
        return $this->response(data: $data);
    }
    public function create(StoreInvoiceRequest $request)
    {
        // var_dump(
        //     [
        //         "user_id" => auth()->user()->id,
        //         "data" => $request->input("data"),
        //     ]
        // );
        $data = Invoice::create([
            "user_id" => auth()->user()->id,
            "data" => $request->input("data"),
        ]);
        return $this->response(data: $data, message: "created successfully", code: 201);
    }
}
