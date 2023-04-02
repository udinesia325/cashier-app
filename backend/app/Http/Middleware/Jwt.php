<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\PayloadException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenBlacklistedException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Psr\Http\Message\ResponseInterface;

class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            JWTAuth::parseToken($request)->authenticate();
            return $next($request);
        } catch (JWTException $e) {
            if (
                $e instanceof TokenInvalidException ||
                $e instanceof TokenBlacklistedException ||
                $e instanceof PayloadException
            ) {
                return $this->invalidResponse("token invalid", 401);
            } else if ($e instanceof TokenExpiredException) {
                if ($request->path() == "api/auth/refresh") {
                    return $next($request);
                }
                return $this->invalidResponse("token expired", 401);
            }
            return $this->invalidResponse("token not provided", 404);
        }
    }
    public function invalidResponse($message, $status = 400)
    {
        return response()->json([
            "status" => false,
            "message" => $message,
            "data" => ""
        ], $status);
    }
}
