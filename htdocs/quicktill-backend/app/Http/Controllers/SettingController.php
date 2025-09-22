<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $pairs = Setting::pluck('value', 'key');
        return response()->json([
            'store_name' => $pairs['store_name'] ?? 'QuickTill',
            'logo_url' => $pairs['logo_url'] ?? null,
            'receipt_footer' => $pairs['receipt_footer'] ?? 'Thank you for your purchase!',
            'printer_host' => $pairs['printer_host'] ?? null,
            'printer_port' => isset($pairs['printer_port']) ? (int)$pairs['printer_port'] : 9100,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'store_name' => 'nullable|string|max:255',
            'logo_url' => 'nullable|url',
            'receipt_footer' => 'nullable|string|max:1000',
            'printer_host' => 'nullable|string',
            'printer_port' => 'nullable|integer',
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return $this->index();
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|file|mimes:png,jpg,jpeg,svg|max:2048',
        ]);

        $path = $request->file('logo')->store('logos', 'public');
        $url = asset('storage/' . $path);
        Setting::updateOrCreate(['key' => 'logo_url'], ['value' => $url]);

        return response()->json(['logo_url' => $url]);
    }
} 