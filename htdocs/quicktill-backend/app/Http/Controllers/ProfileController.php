<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    // API methods (already present)
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

    // Web methods for /profile
    public function show(Request $request)
    {
        $user = $request->user();
        return view('profile.show', ['user' => $user]);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $emailChanged = $data['email'] !== $user->email;
        $user->name = $data['name'];
        $user->email = $data['email'];
        if ($emailChanged) {
            $user->email_verified_at = null;
        }
        $user->save();

        return redirect('/profile')->with('status', 'profile-updated');
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'password' => 'required|string',
        ]);

        if (!Hash::check($data['password'], $user->password)) {
            return redirect('/profile')
                ->withErrors(['password' => 'Incorrect password'], 'userDeletion');
        }

    auth()->logout();
    $user->delete();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
    }
}
