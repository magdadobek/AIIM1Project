<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QnA extends Model
{
    public $timestamps = false;

    protected $table = 'qna';

    protected $fillable = [
        'id_user',
        'date',
        'question_title',
        'question_content',
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
