<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    public $timestamps = false;

    protected $table = 'comments';

    protected $fillable = [
        'id_notice',
        'id_user',
        'content',
        'edited',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    
    public function noticeBoard()
    {
        return $this->belongsTo(NoticeBoard::class,'id_notice');
    }
}
