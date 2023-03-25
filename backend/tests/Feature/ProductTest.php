<?php

namespace Tests\Feature;

use App\Models\Products;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Testing\Fluent\AssertableJson;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class ProductTest extends TestCase
{
    function url_with_token($route)
    {
        $user = User::where("email", config("auth.admin.email"))->first();
        $token = JWTAuth::fromUser($user);
        return $route . "?token=" . $token;
    }
    public function test_get_all_product()
    {
        $this->get($this->url_with_token(route("api.products.index")))
            ->assertSuccessful()
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->hasAny("status", "data", "message", "links", "meta")
                    ->whereType("status", "boolean")
                    ->whereType("message", "string")
            );
    }
    public function test_get_product_by_uuid()
    {
        $product = Products::first();
        $this->get($this->url_with_token(route("api.products.show", ["product" => $product->uuid])))
            ->assertSuccessful()
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->hasAny("status", "data", "message")
                    ->whereType("status", "boolean")
                    ->whereType("message", "string")
                    ->whereType("data.uuid", "string")
                    ->whereType("data.price", "integer")
            );
    }
    public function test_not_found_product()
    {
        $this->get($this->url_with_token(route("api.products.show", ["product" => 1])))
            ->assertNotFound()
            ->assertJson([
                "status" => false,
                "message" => "not found",
                "data" => null
            ]);
    }
    public function test_create()
    {
        $this->post($this->url_with_token(route("api.products.store")), [
            "name" => "product test",
            "price" => 30000,
            "image" => UploadedFile::fake()->image("image.jpg")
        ])->assertCreated();
    }
    public function test_update_and_delete()
    {
        $product = Products::create([
            "name" => "product",
            "price" => 10000
        ]);
        $this->patch($this->url_with_token(route("api.products.update", ["product" => $product->uuid])), [
            "name" => "product updated",
            "price" => 20000
        ])
            ->assertSuccessful()
            ->assertJsonStructure(["message", "data", "status"])
            ->assertJsonPath("data.name", "product updated")
            ->assertJsonPath("data.price", 20000);
        $this->delete($this->url_with_token(route("api.products.destroy", ["product" => $product->uuid])))
            ->assertSuccessful()
            ->assertJsonPath("message", "successfully deleted")
            ->assertJsonPath("data.uuid", $product->uuid);
    }
    public function test_invalid_body_when_create_and_update()
    {
        $product = Products::first();
        $this->postJson($this->url_with_token(route("api.products.store")))
            ->assertInvalid(["name", "price"]);
        $this->patchJson($this->url_with_token(route("api.products.update", ["product" => $product->uuid])))
            ->assertInvalid(["name", "price"]);
    }
}
