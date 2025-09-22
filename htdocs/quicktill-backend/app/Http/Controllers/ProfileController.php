<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function updateName(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $user = $request->user();
        $user->name = $data['name'];
        $user->save();
        return response()->json($user);
    }

    public function updatePassword(Request $request)
    {
        $data = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6'
        ]);

        $user = $request->user();
        if (!Hash::check($data['current_password'], $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }
        $user->password = $data['new_password']; // model casts will hash
        $user->save();
        return response()->json(['message' => 'Password updated']);
    }
}
