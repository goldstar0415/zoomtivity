<?php

namespace App\Http\Requests\PhotoComments;

use App\Http\Requests\Request;
use Illuminate\Contracts\Auth\Guard;

class PhotoCommentsRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @param Guard $auth
     * @return bool
     */
    public function authorize(Guard $auth)
    {
        return $this->route('comments')->user_id === $auth->id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
