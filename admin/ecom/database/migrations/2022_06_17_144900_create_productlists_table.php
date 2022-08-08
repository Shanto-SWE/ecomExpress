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
        Schema::create('productlists', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('price');
            $table->string('discount_price')->default(0);
            $table->string('product_image')->nullable();;
            $table->string('category')->nullable();
            $table->string('subcategory')->nullable();
            $table->string('remark')->nullable();
            $table->string('brand')->nullable();
            $table->string('rating')->nullable();
            $table->integer('stock')->nullable();
            $table->string('product_code')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('productlists');
    }
};
