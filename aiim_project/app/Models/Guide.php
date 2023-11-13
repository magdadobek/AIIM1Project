<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Guide extends Model
{
    use Notifiable;
    protected $table = 'guides';

    protected $fillable = [
        'id_user',
        'kierunek',
        'wydzial',
        'semestr'
    ];
}
