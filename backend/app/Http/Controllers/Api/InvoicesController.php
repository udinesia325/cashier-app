<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Models\History;
use App\Models\Invoice;
use Illuminate\Support\Facades\DB;
use Throwable;

class InvoicesController extends Controller
{
    public function index()
    {
        $data = Invoice::all();
        return $this->response(data: $data);
    }
    public function show(Invoice $invoice)
    {
        return $this->response($invoice);
    }
    public function store(StoreInvoiceRequest $request)
    {
        DB::beginTransaction();
        $jsonData = json_decode($request->input("data"));
        $subtotal = $request->input("subtotal");
        $change = $request->input("change");
        $pay = $request->input("pay");
        try {
            $data = Invoice::create([
                "user_id" => auth()->user()->id,
                "data" => $jsonData,
            ]);
            History::create([
                "invoice_id" => $data->uuid,
                "subtotal" => $subtotal,
                "pay" => $pay,
                "change" => $change,
            ]);
            DB::commit();
            return $this->response(data: $data, message: "created successfully", code: 201);
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->response(null, env("APP_DEBUG") ? $e->getMessage() : "Internal Server Error", 500);
        }
    }
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return $this->response($invoice, message: "deleted successfully");
    }
    public function countSubtotal($arr)
    {
        return (int) collect($arr)->reduce(function (int $carry, $item) {
            return $carry + $item->price;
        }, 0);
    }
}
