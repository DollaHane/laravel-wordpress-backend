<?php

namespace App\Http\Controllers;

use App\Models\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            return redirect('/login');
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
     * Create the user's API key.
     * 
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(Request $request)
    {

        if (Auth::check()) {
            $user_email = Auth::user()->email;
        } else {
            return redirect('/login');
        };

        $keys = DB::table('keys')->where('user_email', $user_email)->get();

        if ($keys->isNotEmpty()) {
            DB::table('keys')->where('user_email', $user_email)->delete();
        }

        $request->validate([
            'key_name' => 'bail|required|string|min:5|max:255',
            'key_secret' => 'required|string',
        ]);

        $key = new Key();
        $key->user_email = $user_email;
        $key->key_name = $request->key_name;
        $key->key_secret = Hash::make($request->key_secret);
        $key->key_secret_short = substr($request->key_secret, 16);
        $key->save();
    }

    /**
     * _________________________________________________________________
     * Delete user's key.
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete($id)
    {
        $key = Key::findOrFail($id);
        $key->delete();
        return redirect()->back()->with('success', 'Successfully deleted key.');
    }
}
