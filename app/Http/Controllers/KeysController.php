<?php

namespace App\Http\Controllers;

use App\Models\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Symfony\Component\Uid\Ulid;

class KeysController extends Controller
{

    /**
     * _________________________________________________________________
     * Show the user's keys settings page.
     */
    public function index()
    {

        if (Auth::check()) {
            $user_email = Auth::user()->email;
        } else {
            return response()->json(["error" => "Unauthorised"], 401);
        };

        $privateKey = new Ulid();
        $keys = DB::table('keys')->where('user_email', $user_email)->get();


        return Inertia::render('settings/keys', [
            'generatedKey' => $privateKey,
            'userKeys' => $keys
        ]);
    }


    /**
     * _________________________________________________________________
     * Create the user's profile settings.
     * 
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(Request $request)
    {

        // $headers = $request->headers->all();
        // Log::info("Headers:", $headers);

        if (Auth::check()) {
            $user_email = Auth::user()->email;
        } else {
            return response()->json(["error" => "Unauthorised"], 401);
        };

        $request->validate([
            'key_name' => 'required|string|max:255',
            'key_secret' => 'required|string',
        ]);

        $key = new Key();
        $key->user_email = $user_email;
        $key->key_name = $request->key_name;
        $key->key_secret = Hash::make($request->key_secret);
        $key->key_secret_short = substr($request->key_secret, 16);
        $key->save();
    }
}
