<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('site_seos', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('des',1000)->nullable();
            $table->string('keywords',1000)->nullable();
            $table->string('og_title')->nullable();
            $table->string('og_des',1000)->nullable();
            $table->string('og_sitename')->nullable();
            $table->string('og_url')->nullable();
            $table->string('og_img')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_seos');
    }
};
