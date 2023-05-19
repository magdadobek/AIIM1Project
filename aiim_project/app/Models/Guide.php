<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guide extends Model
{
    protected $table = 'guides';

    protected $fillable = [
        'id_guide',
        'id_user',
        'kierunek',
        'wydzial',
        'semestr'
    ];
}
