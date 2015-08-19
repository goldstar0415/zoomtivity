<?php

namespace App\Http\Middleware;

use App\Services\Base64File;
use Closure;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Base64Upload
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param $fields
     * @return mixed
     * @internal param string $field
     */
    public function handle($request, Closure $next, ...$fields)
    {
        foreach ($fields as $field) {
            if ($request->has($field)) {
                $base64_data = $request->input($field);
                if (!empty($base64_data)) {
                    $request->files->add([$field => $this->formatFile($base64_data)]);
                }
            }
        }

        return $next($request);
    }

    protected function formatFile($data)
    {
        $file = null;

        if (is_array($data)) {
            $file = new Base64File($data['data'], $data['name']);
        } else {
            $file = new Base64File($data);
        }

        $file->save();

        return new UploadedFile($file->getPath(), $file->getName(), $file->getMime(), $file->getSize(), 0, true);
    }
}
