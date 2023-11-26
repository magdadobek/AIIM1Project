<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePotencialGuidesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('potencial_guides', function (Blueprint $table) {
            $table->id();
            $table->integer("id_user")->unsigned();
            $table->foreign('id_user')->references('id')->on('users');
            $table->string("kierunek");
            $table->string("wydzial");
            $table->integer("semestr");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('potencial_guides');
    }
}
