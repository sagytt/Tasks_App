<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Exception;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::query();

        $tasks->when($request->query('status') != "", function ($q) use ($request) {
            return $q->where('status', $request->query('status'));
        });
        $tasks->when($request->query('date') != "", function ($q) use ($request) {
            return $q->where('date', $request->query('date'));
        });
        $tasks->when($request->query('sort') != "" && $request->query('by') != "", function ($q) use ($request) {
            return $q->orderBy($request->query('sort'), $request->query('by'));
        });
        $tasks->when($request->query('sort') == "", function ($q) use ($request) {
            return $q->orderBy('created_at', 'desc');
        });

        return response()->json([
            'tasks' => $tasks->get(),
            'total' => $tasks->get()->count(),
            'completed' => $tasks->where('status', 1)->get()->count(),
        ], 200);
    }

    public function show($id)
    {
        try
        {
            $task = Task::where('id', $id)->firstorfail();
            
            return response()->json($task, 200);
        }
        catch(Exception $e)
        {
            return response()->json(["message" => "Task Not Found"], 401);
        }
        
    }

    public function store(Request $request)
    {

        try
        {
            $task = Task::create($request->only(['name', 'date']));

            return response()->json($task, 201);
        }
        catch(Exception $e)
        {
            return response()->json(['message'=> 'Faild to create task'], 400);
        }
    }

    public function update(Request $request,$id)
    {
        try
        {
            Task::where('id', $id)->firstorfail()->update($request->only(['name', 'date', 'status']));
            
            return response()->json(["message" => "Task updated successfully"], 200);
        }
        catch(Exception $e)
        {
            return response()->json(["message" => "Could not update task"], 401);
        }
        
    }

    public function delete($id)
    {
        try
        {
            Task::where('id', $id)->firstorfail()->delete();
            
            return response()->json(["message" => "Task deleted successfully"], 200);
        }
        catch(Exception $e)
        {
            return response()->json(["message" => "Could not delete task"], 401);
        }
        
    }
}
