<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained();
            $table->string('project_name');
            $table->enum('project_type', ['1', '2', '3']); // 1 = Custom Project, 2 = Partership, 3 = Maintenance
            $table->text('description');
            $table->integer('project_worth');
            $table->date('start_from');
            $table->date('until');
            $table->date('project_warranty')->nullable();
            $table->boolean('project_status'); //Parthership type  0 = expire, 1 = contract, //0 = on Progress 1 = Done
            $table->enum('host_type', ['1', '2']); // 1 = Self Hosted, 2 = Partner Hosted
            $table->string('domain_name')->nullable();
            $table->date('contract_from')->nullable();
            $table->date('contract_until')->nullable();
            $table->integer('price')->nullable();
            $table->boolean('contract_status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
