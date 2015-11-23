<?php

namespace App\Providers;

use App\BloggerRequest;
use App\Comment;
use App\Events\OnComment;
use App\Events\OnSpotCreate;
use App\Exceptions\TokenException;
use App\Extensions\Validations;
use App\Http\Controllers\SocialContactsController;
use App\Role;
use App\Services\Attachments;
use App\Services\Privacy;
use App\Services\Social\GoogleClient;
use App\Services\Social\GoogleToken;
use App\Spot;
use App\User;
use Config;
use Illuminate\Support\ServiceProvider;
use Request;
use Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Carbon\Carbon::setToStringFormat('Y-m-d h:i:s a');
        Comment::created(function (Comment $comment) {
            event(new OnComment($comment));
        });
        
        Spot::deleting(function (Spot $spot) {
            $spot->comments()->delete();
        });
        
        User::creating(function (User $user) {
            $user->random_hash = str_random();
        });

        BloggerRequest::updated(function (BloggerRequest $request) {
            switch ($request->status) {
                case 'accepted':
                    $user = $request->user;
                    if (!$user->hasRole('blogger')) {
                        $user->roles()->attach(Role::take('blogger'));
                    }
                    break;
            }
        });

        Validator::resolver(function ($translator, $data, $rules, $messages) {
            return new Validations($translator, $data, $rules, $messages);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() == 'local') {
            $this->app->register(\Laracasts\Generators\GeneratorsServiceProvider::class);
        }
        $this->app->bind(Privacy::class, function ($app) {
            return new Privacy($app[\Illuminate\Contracts\Auth\Guard::class]);
        });
        $this->app->bind(Attachments::class, function ($app) {
            return new Attachments($app['request']);
        });
        $this->app->bind(GoogleClient::class, function ($app) {
            if (!$app['session']->has('google_token') and !$app['request']->has('code')) {
                throw new TokenException('No saved token.');
            } elseif ($app['request']->has('code')) {
                $contacts_engine = GoogleClient::getContactsEngine();
                $app['session']->put(
                    'google_token',
                    serialize(new GoogleToken(
                        $contacts_engine->provider->getAccessToken($app['request']->get('code')),
                        $contacts_engine->scopes
                    ))
                );
            }
            $token = unserialize($app['session']->get('google_token'));

            return new GoogleClient($token);
        });
    }
}
