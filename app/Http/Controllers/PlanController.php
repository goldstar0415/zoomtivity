<?php

namespace App\Http\Controllers;

use App\Activity;
use App\Http\Requests\Plan\PlanDestroyRequest;
use App\Http\Requests\Plan\PlanIndexRequest;
use App\Http\Requests\Plan\PlanStoreRequest;
use App\Http\Requests\Plan\PlanUpdateRequest;
use App\Plan;

use App\Http\Requests;

class PlanController extends Controller
{
    /**
     * PlanController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @param PlanIndexRequest $request
     */
    public function index(PlanIndexRequest $request)
    {
        return Plan::where('user_id', $request->get(
            'user_id',
            $request->user() ? $request->user()->id : null
        ))->paginate((int)$request->get('limit', 10));
    }

    /**
     * Store a newly created resource in storage.
     * @param PlanStoreRequest $request
     * @return Plan
     */
    public function store(PlanStoreRequest $request)
    {
        $plan = new Plan($request->only('title', 'location', 'address'));
        if ($request->has('description')) {
            $plan->description = $request->input('description');
        }
        if ($request->has('start_date')) {
            $plan->start_date = $request->input('start_date');
        }
        if ($request->has('end_date')) {
            $plan->end_date = $request->input('end_date');
        }
        $request->user()->plans()->save($plan);

        if ($request->has('spots')) {
            $plan->spots()->sync($request->input('spots'));
        }
        if ($request->has('activities')) {
            foreach ($request->input('activities') as $activity_data) {
                $activity = new Activity($activity_data);
                $plan->activities()->save($activity);
            }
        }

        return $plan;
    }

    /**
     * Display the specified resource.
     * @param Plan $plan
     * @return Plan
     */
    public function show($plan)
    {
        return $plan;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PlanUpdateRequest $request
     * @param  Plan $plan
     * @return Plan
     */
    public function update(PlanUpdateRequest $request, $plan)
    {
        $plan->title = $request->input('title');
        $plan->location = $request->input('location');
        $plan->address = $request->input('address');
        if ($request->has('description')) {
            $plan->description = $request->input('description');
        }
        if ($request->has('start_date')) {
            $plan->start_date = $request->input('start_date');
        }
        if ($request->has('end_date')) {
            $plan->end_date = $request->input('end_date');
        }
        $plan->save();

        if ($request->has('spots')) {
            $plan->spots()->sync($request->input('spots'));
        }
        $plan->activities()->delete();
        if ($request->has('activities')) {
            foreach ($request->input('activities') as $activity_data) {
                $activity = new Activity($activity_data);
                $plan->activities()->save($activity);
            }
        }

        return $plan;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param PlanDestroyRequest $plan
     * @return array
     */
    public function destroy(PlanDestroyRequest $plan)
    {
        return ['result' => $plan->delete()];
    }
}
