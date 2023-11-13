<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->foreign('id_user')
                ->references('id')
                ->on('users');
            $table->string('type_user',1);
            $table->integer('id_chat');
            $table->foreign('id_chat')
                ->references('id')
                ->on('chats');
            $table->string('content');
            $table->timestamp('send_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
