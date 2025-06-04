<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adverts', function (Blueprint $table) {
            $table->ulid('id')->unique();
            $table->string('user_email')->index();
            $table->string('title');
            $table->string('description');
            $table->integer('rental_cost');
            $table->boolean('available')->default(true);
            $table->timestamp('return_date')->default(null);
            $table->timestamps();
            $table->foreign('user_email')->references('email')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adverts');
    }
};
