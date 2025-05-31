<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    /** @use HasFactory<\Database\Factories\KeyFactory> */
    /**
     * @var string
     */

    use HasFactory;
    use HasUlids;

    protected $table = 'keys';
    protected $fillable = ['user_id', 'key_name', 'key_secret'];
    
}
