<?php

namespace App\Jobs;

use App\Jobs\Job;
use App\RemotePhoto;
use App\Services\AppSettings;
use App\Services\GoogleAddress;
use App\Spot;
use App\SpotPhoto;
use App\SpotTypeCategory;
use DateTime;
use GuzzleHttp\Client;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Collection;
use Storage;
use Log;

class ParseEvents extends Job implements SelfHandling, ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    /**
     * @var Client
     */
    private $http;

    /**
     * @var string
     */
    protected $api_url = 'http://api.seatgeek.com/2/events';

    /**
     * @var AppSettings
     */
    private $settings;

    /**
     * @var GoogleAddress
     */
    private $google_address = null;

    /**
     * Execute the job.
     *
     * @param Client $http
     * @param AppSettings $settings
     * @param GoogleAddress $address
     */
    public function handle(Client $http, AppSettings $settings, GoogleAddress $address)
    {
        $this->http = $http;
        $this->settings = $settings;
        $this->google_address = $address;

        $query_string = ['sort' => 'id.desc', 'page' => 1, 'per_page' => /*1000*/10];
        $parser_settings = $this->settings->parser;
        $data = [];

        if (isset($parser_settings->aid)) {
            $query_string['aid'] = $this->settings->parser->aid;
        }

        $pages_count = 0;
        $data = $this->fetchData($query_string);
        $events = collect($data['events']);
        $last_id = $events->sortBy('id')->last()['id'];

        $pages_count = ceil($data['meta']['total'] / $data['meta']['per_page']);
        for ($page = 2; $page < 3 /*$pages_count*/; ++$page) {
            if (!$this->importEvents($events)) {
                break;
            }
            $query_string['page'] = $page;
            $data = $this->fetchData($query_string);
            $events = collect($data['events']);
        }

        $parser_settings->last_imported_id = $last_id;

        $this->settings->parser = $parser_settings;
    }

    public function importEvents(Collection $events)
    {
        $default_category = SpotTypeCategory::whereName('seatgeek')->first();

        foreach ($events->sortByDesc('id') as $event) {
            if (
                isset($this->settings->parser->last_imported_id) and
                $this->settings->parser->last_imported_id === $event['id']
            ) {
                return false;
            }
            $date = DateTime::createFromFormat(DateTime::ISO8601, $event['datetime_local'] . '+0000');

            $import_event = new Spot();
            $import_event->category()->associate($default_category);
            $import_event->title = $event['title'];
            $import_event->description = implode("\n", [
                $event['short_title'],
                '<a href="' . $event['venue']['url'] . '">' . $event['venue']['name'] . '</a>',
                $event['datetime_local']
            ]);
            $import_event->start_date = $date->format('Y-m-d H:i:s');
            $import_event->end_date = $date->format('Y-m-d 23:59:59');
            $import_event->web_sites = $this->getWebSites($event);
            $import_event->is_approved = true;
            $import_event->save();

            $address = '';
            if (is_null($event['venue']['address'])) {
                $address = $this->google_address->get(
                    $event['venue']['location']['lat'],
                    $event['venue']['location']['lon']
                );
            } else {
                $venue = $event['venue'];

                $address = implode(', ', array_filter(
                    [
                        $venue['address'],
                        $venue['city'],
                        $venue['extended_address'],
                        $venue['state']
                    ],
                    function ($value) {
                        return !empty($value);
                    }
                ));
            }
            $import_event->points()->create([
                'address' => $address,
                'location' => [
                    'lat' => $event['venue']['location']['lat'],
                    'lng' => $event['venue']['location']['lon']
                ]
            ]);

            $import_event->remotePhotos()->saveMany( $this->getRemotePhotos($event) );
        }

        return true;
    }

    protected function getWebSites($event)
    {
        $sites = [];

        if (!empty($event['url'])) {
            $sites[] = $event['url'];
        }

        if (!empty($event['venue']['url'])) {
            $sites[] = $event['venue']['url'];
        }

        return $sites ?: null;
    }

    /**
     * Get photos from imported event
     *
     * @param $event
     * @return array
	 * @deprecated
     */
    protected function getPhotos($event)
    {
        $photos = [];
        foreach ($event['performers'] as $performer) {
            if ($performer['image']) {
                $photos[] = new SpotPhoto(['photo' => $performer['image']]);
            }
        }

        return $photos;
    }

	/**
	 * Get remote photos
	 * @param $event
	 * @return array
	 */
    protected function getRemotePhotos($event)
    {
        $remotePhotos = [];
        $needCover = true;
        foreach ($event['performers'] as $performer) {
            if ($performer['image']) {
                $remotePhotos[] = new RemotePhoto([
                    'url' => $performer['image'],
                    'image_type' => $needCover ? 1 : 0, // 1 - cover, 0 - regular
                    'size' => 'original',
                ]);
                $needCover = false;
            }
        }
        return $remotePhotos;
    }

    /**
     * @param $query_string
     * @return mixed
     */
    public function fetchData($query_string)
    {
        $response = $this->http->get($this->api_url, [
            'query' => $query_string
        ]);
        $data = json_decode((string)$response->getBody(), true);

        return $data;
    }
}
