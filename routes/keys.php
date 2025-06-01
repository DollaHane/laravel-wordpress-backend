<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KeysController;


Route::middleware('auth')->group(function () {
  Route::get('/settings/keys', [KeysController::class, 'index'])->name('keys.index');
  Route::post('/settings/keys', [KeysController::class, 'create'])->name('keys.create');
});
