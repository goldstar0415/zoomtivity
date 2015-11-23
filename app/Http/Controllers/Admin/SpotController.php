<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\SearchRequest;
use App\Http\Requests\Admin\SpotFilterRequest;
use App\Http\Requests\Admin\SpotsBulkUpdateRequest;
use App\Http\Requests\PaginateRequest;
use App\Spot;
use App\User;
use DB;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class SpotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param PaginateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function index(PaginateRequest $request)
    {
        return view('admin.spots.index')->with('spots', $this->paginatealbe($request, Spot::query(), 15));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param SpotFilterRequest $request
     * @return \Illuminate\Http\Response
     */
    public function emailSavers(SpotFilterRequest $request)
    {
        $users = User::whereHas('calendarSpots', function ($query) use ($request) {
            $this->getFilterQuery($request, $query);
        })->get(['id'])->each(function (User $user) {
            $user->setAppends([]);
        })->pluck('id')->toArray();

        return redirect()->route('admin.email', $users ? compact('users') : []);
    }

    public function exportFilter(SpotFilterRequest $request)
    {
        //TODO: make
    }

    public function bulkUpdate(SpotsBulkUpdateRequest $request)
    {
        Spot::whereIn('id', $request->spots)->get()->each(function (Spot $spot) use ($request) {
            if ($request->has('address')) {
                $spot->address = $request->address;
                $spot->location = $request->location;
            }
            if ($request->has('start_date')) {
                $spot->start_date = $request->start_date;
            }
            if ($request->has('end_date')) {
                $spot->end_date = $request->end_date;
            }
            if ($request->has('users')) {
                $spot->user()->associate($request->users);
            }
            $spot->save();
        });

        return back();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param SpotFilterRequest $request
     * @return \Illuminate\Http\Response
     */
    public function emailList(SpotFilterRequest $request)
    {
        $users = User::whereHas('spots', function ($query) use ($request) {
            $this->getFilterQuery($request, $query);
        })->get(['id'])->each(function (User $user) {
            $user->setAppends([]);
        })->pluck('id')->toArray();

        return redirect()->route('admin.email', $users ? compact('users') : []);
    }

    /**
     * Display the specified resource.
     *
     * @param Requests\Admin\SearchRequest $request
     * @return \Illuminate\Http\Response
     */
    public function search(SearchRequest $request)
    {
        return view('admin.spots.index')->with('spots', Spot::search($request->search_text)->paginate());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param SpotFilterRequest $request
     * @return \Illuminate\Http\Response
     */
    public function filter(SpotFilterRequest $request)
    {
        $query = $this->getFilterQuery($request, Spot::query());

        return view('admin.spots.index')->with('spots', $this->paginatealbe($request, $query, 15));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Spot  $spot
     * @return \Illuminate\Http\Response
     */
    public function destroy($spot)
    {
        $spot->delete();

        return back();
    }

    /**
     * @param SpotFilterRequest $request
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function getFilterQuery(SpotFilterRequest $request, $query)
    {
        if ($request->has('filter.title')) {
            $query->where('title', 'ilike', '%' . $request->filter['title'] . '%');
        }
        if ($request->has('filter.description')) {
            $query->where('description', 'ilike', '%' . $request->filter['description'] . '%');
        }
        if ($request->has('filter.address')) {
            $query->whereHas('points', function ($query) use ($request) {
                $query->where('address', 'ilike', '%' . $request->filter['address'] . '%');
            });
        }
        if ($request->has('filter.username') or $request->has('filter.user_email')) {
            $query->whereHas('user', function ($query) use ($request) {
                if ($request->has('filter.username')) {
                    $query->search($request->filter['username']);
                }
                if ($request->has('filter.user_email')) {
                    $query->where('email', 'ilike', '%' . $request->filter['user_email'] . '%');
                }
            });
        }
        if ($request->has('filter.date')) {
            $query->where(function ($query) use ($request) {
                $query->where(DB::raw('start_date::date'), '<=', $request->filter['date'])
                    ->where(DB::raw('end_date::date'), '>=', $request->filter['date'])
                    ->whereNotNull('start_date');
            });
        }
        if ($request->has('filter.created_at')) {
            $query->where(DB::raw('created_at::date'), $request->filter['created_at']);
        }
        $request->flash();

        return $query;
    }
}
