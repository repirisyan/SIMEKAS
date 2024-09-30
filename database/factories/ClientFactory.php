<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Client::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'company_name' => $this->faker->company(),
            'client_email' => $this->faker->unique()->email(),
            'whatsapp_number' => $this->faker->unique()->phoneNumber(),
            'address' => $this->faker->address(),
        ];
    }
}
