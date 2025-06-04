<?php

namespace App\Http\Controllers;

use App\Models\Adverts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Symfony\Component\Uid\Ulid;

use function Pest\Laravel\get;
use function Pest\Laravel\json;

class AdvertsController extends Controller
{
    /**
     * _________________________________________________________________
     * Index Page
     */

    public function index()
    {

        if (Auth::check()) {
            $user_email = Auth::user()->email;
        } else {
            return redirect('/login');
        }

        $adverts = DB::table('adverts')->where('user_email', $user_email)->orderBy('created_at', 'desc')->get();

        return Inertia::render('adverts', [
            'adverts' => $adverts
        ]);
    }

    /**
     * _________________________________________________________________
     * Show Advert
     * 
     * @param string $id
     */

    public function show($id)
    {
        $advert = DB::table('adverts')->where('ad_id', $id)->get();

        return Inertia::render('adverts/{id}', [
            'advert' => $advert
        ]);
    }

    /**
     * _________________________________________________________________
     * Create Page
     */
    public function createPage()
    {
        return Inertia::render('adverts/create');
    }


    /**
     * _________________________________________________________________
     * Create
     * 
     * @throws Illuminate\Validation\ValidationException
     */

    public function create(Request $request)
    {

        if (Auth::check()) {
            $user_email = Auth::user()->email;
        } else {
            return redirect('/login');
        }

        $request->validate([
            'title' => 'bail|required|string|min:5|max:255',
            'description' => 'required|string|min:5|max:255',
            'rental_cost' => 'required|numeric|min:5',
        ]);

        $advert = new Adverts();
        $advert->user_email = $user_email;
        $advert->title = $request->title;
        $advert->description = $request->description;
        $advert->rental_cost = $request->rental_cost;
        $advert->save();
        return redirect('/adverts');
    }

    /**
     * _________________________________________________________________
     * Delete
     * 
     * @param string $id
     */

    public function delete($id)
    {
        $advert = Adverts::findOrFail($id);
        $advert->delete();
        redirect()->back()->with('Success', 'Successfully deleted advert.');
    }

    /**
     * _________________________________________________________________
     * WP Create
     */

    public function wpcreate(Request $request)
    {
        $header = $request->header();
        $api_key = $header['api-key'][0];
        $user_email = $header['user-email'][0];
        $id = new Ulid();
        $current_date = now();

        $key = DB::table('keys')->where('user_email', $user_email)->first();
        if (!$key) {
            return response()->json(['message' => 'Unauthorised'], 401);
        }

        $user = DB::table('users')->where('email', $user_email)->first();
        if (!$user) {
            return response()->json(['message' => 'Unauthroised'], 401);
        }

        if (Hash::check($api_key, $key->key_secret)) {

            $validated = $request->validate([
                'title' => 'required|string|min:5|max:255',
                'description' => 'required|string|min:5|max:255',
                'rental_cost' => 'required|numeric|gt:0',
            ]);

            try {
                DB::table('adverts')->insert([
                    'id' => $id,
                    'user_email' => $user_email,
                    'title' => $validated['title'],
                    'description' => $validated['description'],
                    'rental_cost' => $validated['rental_cost'],
                    'created_at' => $current_date,
                    'updated_at' => $current_date,
                ]);

                return response()->json([
                    'message' => 'Advert created successfully'
                ], 201);
            } catch (\Exception $error) {
                Log::error('Failed to create advert: ' . $error->getMessage());
                return response()->json(['message' => 'Failed to create advert'], 500);
            }
        } else {
            return response()->json(["message" => "Unauthorised"], 401);
        }
    }
}
