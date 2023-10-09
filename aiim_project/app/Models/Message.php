<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    public $timestamps = false;

    protected $table = 'notice_board';

    protected $fillable = [
        'id_user',
        'type_user',
        'id_chat',
        'content',
        'send_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'id_chat');
    }
}
