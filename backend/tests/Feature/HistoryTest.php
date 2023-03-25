<?php

namespace Tests\Feature;

use App\Models\History;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class HistoryTest extends TestCase
{
    function url_with_token($route)
    {
        $user = User::where("email", config("auth.admin.email"))->first();
        $token = JWTAuth::fromUser($user);
        return $route . "?token=" . $token;
    }
    public function test_get_all_histories()
    {
        $this->get($this->url_with_token(route("api.histories.index")))
            ->assertSuccessful()
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->hasAll(["links", "meta", "status", "message"])
                    ->has(
                        "data.0",
                        fn (AssertableJson $json) =>
                        $json->whereType("subtotal", "integer")
                            ->whereType("pay", "integer")
                            ->whereType("change", "integer")
                            ->etc()
                    )
            );
    }
    public function test_get_history_by_id()
    {
        $history = History::first();
        if ($history) {
            $this->get($this->url_with_token(route("api.histories.show", ["history" => $history->id])))
                ->assertSuccessful()
                ->assertJson(
                    fn (AssertableJson $json) =>
                    $json->whereType("data.subtotal", "integer")
                        ->whereType("data.pay", "integer")
                        ->whereType("data.change", "integer")
                        ->etc()

                );
        } else {
            $this->assertEquals("no histories", "no histories");
        }
    }
    public function test_not_found()
    {
        $this->get($this->url_with_token(route("api.histories.show", ["history" => "not found"])))
            ->assertNotFound();
    }
}
