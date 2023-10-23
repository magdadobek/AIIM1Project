<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    public $timestamps = false;

    protected $table = 'chats';

    protected $fillable = [
        'id_user',
        'id_guide',
        'created_at',
        'edited_at',
        'open'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function guide()
    {
        return $this->belongsTo(Guide::class, 'id_guide');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'id_chat');
    }
}
