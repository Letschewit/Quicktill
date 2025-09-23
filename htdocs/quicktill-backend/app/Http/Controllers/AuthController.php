<?php
// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    public function login(Request $request) {
        $data = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email',
            'password' => 'required',
        ]);

        $attempted = false;
        $success = false;

        if (!empty($data['name'])) {
            $attempted = true;
            $success = Auth::attempt(['name' => $data['name'], 'password' => $data['password']]);
        }
        if (!$success && !empty($data['email'])) {
            $attempted = true;
            $success = Auth::attempt(['email' => $data['email'], 'password' => $data['password']]);
        }

        if (!$attempted) {
            return response()->json(['message' => 'Username or email is required'], 422);
        }

        if (!$success) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function index() {
        return response()->json(User::all());
    }
    
    public function updateRole(Request $request, User $user) {
        $request->validate([
            'role' => 'required|in:admin,cashier'
        ]);

        $user->role = $request->role;
        $user->save();

        return response()->json($user);
    }

    public function destroy(Request $request, User $user) {
        if ($request->user()->id === $user->id) {
            return response()->json(['message' => 'You cannot delete your own account'], 422);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }

    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'cashier',
        ]);

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }
}
