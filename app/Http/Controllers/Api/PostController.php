<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        if (!in_array($orderColumn, ['id', 'title', 'created_at'])) {
            $orderColumn = 'created_at';
        }

        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderColumn = 'desc';
        }

        $posts = Post::with(['category:id,name'])
            ->when(\request('search_category'), function ($query) {
                $query->where('category_id', request('search_category'));
            })
            ->when(\request('search_id'), function ($query) {
                $query->where('id', request('search_id'));
            })
            ->when(\request('search_category'), function ($query) {
                $query->where('title', 'LIKE', '%' . request('search_title') .'%');
            })
            ->when(\request('search_content'), function ($query) {
                $query->where('content', 'LIKE', '%' . request('search_content') .'%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                        ->orWhere('title', 'LIKE', '%' . request('search_global') .'%')
                        ->orWhere('content', 'LIKE', '%' . request('search_global') .'%');
                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(10);

        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        if ($request->hasFile('thumbnail')) {
            $filename = uniqid('th_', true) . '_';
            $filename .= $request->file('thumbnail')?->getClientOriginalName();
            info($filename);
        }
        $post = Post::create($request->validated());

        return new PostResource($post);
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(StorePostRequest $request, Post $post)
    {
        $post->update($request->validated());

        return response()->json(['Updated'], Response::HTTP_ACCEPTED);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->noContent();
    }
}
