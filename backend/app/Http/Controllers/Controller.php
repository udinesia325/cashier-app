<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    public function response($data = null, $message = '', $code = 200, $status = true)
    {
        return response()->json([
            "status" => $status,
            "message" => $message,
            "data" => $data
        ], $code);
    }
}
