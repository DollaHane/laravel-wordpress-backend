<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdvertsController;
use App\Http\Middleware\Cors;

Route::middleware(Cors::class)->group(function () {
  Route::get('adverts/wp', [AdvertsController::class, 'wpshow'])->name('wp.show');
  Route::post('adverts/wp', [AdvertsController::class, 'wpcreate'])->name('wp.create');
});
