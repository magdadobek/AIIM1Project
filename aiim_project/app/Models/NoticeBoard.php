<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NoticeBoard extends Model
{
    public $timestamps = false;

    protected $table = 'Notice_board';

    protected $fillable = [
        'id_user',
        'date',
        'title',
        'content',
        'open',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
