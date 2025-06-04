<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Adverts extends Model
{
    /**
     * @var string
     */

    use HasUlids;

    protected $table = 'adverts';
    protected $fillable = ['title', 'description', 'user_email', 'rental_cost', 'available', 'return_date'];
}
