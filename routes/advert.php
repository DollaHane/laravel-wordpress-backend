<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdvertsController;

Route::middleware('auth')->group(function () {
  Route::get('/adverts', [AdvertsController::class, 'index'])->name('adverts.index');
  Route::post('/adverts', [AdvertsController::class, 'create'])->name('adverts.create');
  Route::get('/adverts/create-advert', [AdvertsController::class, 'createPage'])->name('adverts.createPage');
  Route::get('/adverts/{id}', [AdvertsController::class, 'show'])->name('adverts.show');
  Route::delete('/adverts/{id}', [AdvertsController::class, 'delete'])->name('adverts.delete');
});
