<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    //use HasApiTokens, HasFactory, Notifiable;

    public $timestamps = false;
    
    protected $primaryKey = 'id';

    protected $fillable = [
        'nickname',
        'index',
        'email',
        'password',
        'account_type',
    ];

    protected $hidden = [
        'password'
    ];
}
