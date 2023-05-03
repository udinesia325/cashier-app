<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Products;
use Illuminate\Support\Str;
use Throwable;

class ProductController extends Controller
{
    public function index()
    {
        $products = ProductResource::collection(Products::paginate(config("app.data_per_page")));

        $products->with = [
            "status" => true,
            "message" => "All Products",
        ];
        return $products;
    }
    public function show(Products $product)
    {

        return $this->response($product);
    }
    public function store(StoreProductRequest $request)
    {
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
            return $this->response(message: env("APP_DEBUG") ? $e->getMessage() : "Internal server error", code: 501, status: false);
        }
    }
    public function destroy(Products $product)
    {
        try {
            if (strlen($product->image) > 0) {
                unlink(public_path($product->image));
            }
            $product->delete();
            return $this->response(message: "successfully deleted", data: $product);
        } catch (Throwable $e) {
            return $this->response(message: env("APP_DEBUG") ? $e->getMessage() : "Internal server error", code: 501, status: false);
        }
    }
    public function update(UpdateProductRequest $request, Products $product)
    {
        $input = $request->only("name", "price");
        $image = $request->file("image");
        $path = "images/";
        if ($image) {
            $filename = $path . Str::random(4) . time() . "." . $image->getClientOriginalExtension();
            // hapus gambar lama 
            if (strlen($product->image) > 0) {
                unlink(public_path($product->image));
            }
            $image->move($path, $filename);
        }
        try {
            $product->name = $input["name"];
            $product->price = $input["price"];
            $product->image = $image ? $filename : $product->image;
            $product->save();
            return $this->response($product, "product updated successfully");
        } catch (Throwable $e) {
            return $this->response(message: env("APP_DEBUG") ? $e->getMessage() : "Internal server error", code: 501, status: false);
        }
    }
}
