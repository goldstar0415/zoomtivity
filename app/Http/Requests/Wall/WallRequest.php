<?php

namespace App\Http\Requests\Wall;

use App\Http\Requests\AttachableRequest;
use App\Http\Requests\Request;
use App\Services\Attachments;

class WallRequest extends Request
{
    use AttachableRequest;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->route('wall')->sender_id === $this->user()->id or $this->user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'user_id' => 'required|integer',
            'message' => [
                $this->message_rule,
                'string',
                'max:5000'
            ]
        ];

        $rules = $this->attachmentsRules($rules);

        return $rules;
    }
}
