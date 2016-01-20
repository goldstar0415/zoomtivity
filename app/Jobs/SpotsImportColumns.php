<?php

namespace App\Jobs;

use App\Extensions\AppCollection;
use App\Jobs\Job;
use Illuminate\Contracts\Bus\SelfHandling;

class SpotsImportColumns extends SpotsImport
{

    /**
     * @var \Illuminate\Support\Collection
     */
    private $spots;

    protected $columns = [
        'title',
        'description',
        'websites',
        'latitude',
        'longitude',
        'address',
        'image_links',
        'rating',
        'start_date',
        'end_date',
        'email'
    ];

    public function __construct(array $spots, array $data, $type)
    {
        parent::__construct($data, $type);

        $this->spots = $this->makeSpots($spots);
    }

    public function getSpots()
    {
        return $this->spots;
    }

    /**
     * @param array $data
     * @return \Illuminate\Support\Collection
     */
    protected function makeSpots(array $data)
    {
        $result = [];
        foreach ($this->columns as $column) {
            $result[str_plural($column)] = preg_split("/(\r\n|\n|\r)/", $data[$column]);
        }

        $spots = [];
        for($num = 0; $num < count($result[str_plural($this->columns[0])]); ++$num) {
            $row = [];
            foreach ($this->columns as $column) {
                $row[$column] = isset($result[str_plural($column)][$num]) ? $result[str_plural($column)][$num] : null;
            }
            $spots[] = AppCollection::make($row);
        }

        return $spots;
    }
}
