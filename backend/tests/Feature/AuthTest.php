<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    function url_with_token($route)
    {
        $user = User::where("email", config("auth.admin.email"))->first();
        $token = JWTAuth::fromUser($user);
        return $route . "?token=" . $token;
    }

    public function test_login()
    {
        $this->postJson(route("api.auth.login"), [
            "email" => config("auth.admin.email"),
            "password" => config("auth.admin.password")
        ])
            ->assertStatus(200)
            ->assertJsonPath("data.email", config("auth.admin.email"));
    }
    public function test_invalid_login_credential()
    {
        $this->postJson(route("api.auth.login"), [
            "email" => "wrong@gmail.com",
            "password" => "wrongpassword"
        ])
            ->assertStatus(401)
            ->assertJson([
                "status" => false,
                "message" => "Unauthorized",
                "data" => null
            ]);
    }
    public function test_logout()
    {

        $this->postJson($this->url_with_token(route("api.auth.logout")))
            ->assertStatus(200)
            ->assertJsonPath("message", "Successfully logged out")
            ->assertJsonPath("data", null);
    }
    public function test_authenticated_token()
    {

        $this->postJson($this->url_with_token(route("api.auth.me")))
            ->assertStatus(200)
            ->assertJsonPath("email", config("auth.admin.email"));
    }
    public function test_refresh_token()
    {

        $this->postJson($this->url_with_token(route("api.auth.refresh")))
            ->assertStatus(200)
            ->assertJson([
                "status" => true,
                "data" => [
                    "token_type" => "bearer"
                ]
            ]);
    }
}
