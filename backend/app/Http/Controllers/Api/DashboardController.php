<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //total user
        $totalUser = User::get()->count();
        // total product
        $totalProduct = Products::get()->count();
        // produk terjual dalam sebulan
        $totalProdukTerjual = 0;
        $totalUangMasuk = 0;
        $invoices = Invoice::whereMonth('updated_at', date("m"))->get();
        foreach ($invoices as $inv) {
            foreach ($inv->data as $d) {
                $totalProdukTerjual += $d["qty"];
                $totalUangMasuk += $d["price"] * $d["qty"];
            }
        }

        return $this->response(compact("totalUser", "totalProduct", "totalProdukTerjual", "totalUangMasuk"));
    }
}
