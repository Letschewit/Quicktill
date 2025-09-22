<?php
// app/Http/Middleware/RoleMiddleware.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware {
    public function handle($request, Closure $next, ...$roles) {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if (!in_array(Auth::user()->role, $roles)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return $next($request);
    }
}
