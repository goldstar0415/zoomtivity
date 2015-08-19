<?php

namespace App\Events;

use App\Spot;
use App\SpotReview;
use Illuminate\Queue\SerializesModels;

class OnSpotReview extends Event implements Feedable
{
    use SerializesModels;

    /**
     * @var SpotReview
     */
    public $review;

    /**
     * Create a new event instance.
     *
     * @param Spot $spot
     * @param SpotReview $review
     */
    public function __construct(SpotReview $review)
    {
        $this->review = $review;
    }

    public function getFeedable()
    {
        return $this->review;
    }

    public function getFeedSender()
    {
        return $this->review->user;
    }
}
