<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PotencialGuide extends Model
{
    use HasFactory;

    protected $table = 'potencial_guides';

    protected $fillable = [
        'id_user',
        'kierunek',
        'wydzial',
        'semestr',
    ];

    public $timestamps = false;

}
