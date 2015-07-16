<?php

use Illuminate\Database\Seeder;
use App\Spot;

class SpotTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * @var App\User $user
         */
        $user = App\User::random()->first();
        $models = factory(Spot::class, 25)->make()->each(function (Spot $spot) {
            $category = App\SpotTypeCategory::orderBy(DB::raw('RANDOM()'))->take(1)->first();
            $spot->category()->associate($category);
        });
        $user->spots()->saveMany($models);
    }
}
