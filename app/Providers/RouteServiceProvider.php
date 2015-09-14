<?php

namespace App\Providers;

use App\ActivityLevel;
use App\Album;
use App\AlbumPhoto;
use App\Blog;
use App\Comment;
use App\Area;
use App\ChatMessage;
use App\Friend;
use App\Plan;
use App\Social;
use App\Spot;
use App\SpotPhoto;
use App\User;
use App\Wall;
use Illuminate\Routing\Router;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to the controller routes in your routes file.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @param  \Illuminate\Routing\Router $router
     */
    public function boot(Router $router)
    {
        $router->model('albums', Album::class);
        $router->bind('photos', function ($value) {
            if (Request::is('photos/*')) {
                return AlbumPhoto::findOrFail($value);
            } elseif (Request::is('spots/*')) {
                return SpotPhoto::findOrFail($value);
            }

            return $value;
        });
        $router->model('users', User::class);
        $router->model('friends', Friend::class);
        $router->model('spots', Spot::class);
        $router->model('message', ChatMessage::class);
        $router->model('areas', Area::class);
        $router->model('comments', Comment::class);
        $router->model('wall', Wall::class);
        $router->model('plans', Plan::class);
        $router->model('posts', Blog::class);
        $router->bind('post_slug', function ($value) {
            $blog_post = Blog::where('slug', $value)->first();

            if ($blog_post === null) {
                throw new NotFoundHttpException;
            }

            return $blog_post;
        });

        // Admin

        $router->model('activitylevel', ActivityLevel::class);
        $router->bind('social', function ($value) {
            return Social::where('name', $value)->first();
        });

        parent::boot($router);
    }

    /**
     * Define the routes for the application.
     *
     * @param  \Illuminate\Routing\Router  $router
     * @return void
     */
    public function map(Router $router)
    {
        $router->group(['namespace' => $this->namespace], function ($router) {
            require app_path('Http/routes.php');
        });
    }
}
