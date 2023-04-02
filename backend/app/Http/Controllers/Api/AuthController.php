<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);
        $credentials = $request->only(["email", "password"]);

        if (!$token = auth()->attempt($credentials)) {
            return $this->response(message: 'Unauthorized', status: false, code: 401);
        }
        $user = auth()->user();
        return $this->response([
            "name" => $user->name,
            "email" => $user->email,
            "role" => $user->role,
            ...$this->respondWithToken($token)
        ]);
        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $token = auth()->user();
        if (!$token) {
            return $this->response(message: "token invalid", status: false, code: 400);
        }
        return response()->json($token);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return $this->response(message: "Successfully logged out");
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $token = auth()->refresh();
            return $this->response([
                ...$this->respondWithToken($token)
            ]);
        } catch (JWTException $e) {
            return $this->response(message: "token expired", code: 401, status: false);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
