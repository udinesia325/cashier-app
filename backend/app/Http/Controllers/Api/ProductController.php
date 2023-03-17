<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Throwable;

class ProductController extends Controller
{
    public function index()
    {
        $products = ProductResource::collection(Products::paginate(10));

        $products->with = [
            "status" => true,
            "message" => "All Products",
        ];
        return $products;
    }
    public function response($data = null, $message = '', $code = 200, $status = true)
    {
        return response()->json([
            "status" => $status,
            "message" => $message,
            "data" => $data
        ], $code);
    }
    public function show(Products $products)
    {
        return $this->response($products);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => "required|min:2|max:255",
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => "required|integer"
        ]);

        if ($validator->fails()) {
            return $this->response([
                "error" => $validator->errors()
            ], "validation error", 422, false);
        }
        // return "oke";
        $input = $request->only("name", "price");
        $image = $request->file("image");
        $path = "images/";
        $filename = $path . Str::random(4) . time() . "." . $image->getClientOriginalExtension();
        $image->move($path, $filename);
        try {
            $product = Products::create([
                ...$input,
                "image" => $filename
            ]);
            return $this->response($product, "product added successfully", 201);
        } catch (Throwable $e) {
            if (env("APP_DEBUG")) {
                return $this->response(message: $e->getMessage(), code: 501, status: false);
            }
            return $this->response(message: "Internal server error", code: 501, status: false);
        }
    }
}
