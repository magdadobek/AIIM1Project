<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QnAComments extends Model
{

    public $timestamps = false;

    protected $table = 'qna_comments';

    protected $fillable = [
        'id_question',
        'id_user',
        'content',
        'edited',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function qna()
    {
        return $this->belongsTo(NoticeBoard::class,'id_question');
    }
}
