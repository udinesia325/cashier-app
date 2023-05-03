<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
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
        if ($user->is_active == false) return $this->response(message: "you are not activated, wait an admin", code: 400, status: false);
        return $this->response([
            "name" => $user->name,
            "email" => $user->email,
            "role" => $user->role,
            ...$this->respondWithToken($token)
        ]);
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
    public function register(RegisterRequest $request)
    {
        try {
            User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'email_verified_at' => now(),
                'password' => Hash::make($request->input('password')),
                'role' => 'user',
                'is_active' => false,
                'remember_token' => Str::random(10),
            ]);
            return $this->response(message: "Successfully registered, wait admin for activate");
        } catch (Exception $e) {
            return $this->response($e);
        }
    }
    // untuk aktivasi user (harus admin)
    public function activate(Request $request)
    {
        if (auth()->user()->role != "admin") {
            return $this->response(message: "you're not an admin !", status: false, code: 403);
        }
        $request->validate([
            "email" => "required|email"
        ]);
        try {
            $user = User::where('email', $request->email)
                ->update(['is_active' => true]);
            if (!$user) return $this->response(message: "email not found ", code: 404, status: false);
            return $this->response(message: "Successfully activated! please login");
        } catch (Exception $e) {
            return $this->response(message: "internal server error", code: 501, status: false);
        }
    }
}
