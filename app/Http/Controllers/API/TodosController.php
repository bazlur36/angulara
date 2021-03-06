<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Todo;
use App\Http\Controllers\Controller;

class TodosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {

        $todos = Todo::all();
        return $todos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request) {
        $todo = new Todo();

        $todo->title = $request->input('title');

        $todo->save();
        return $todo;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request,$id) {
        $todo = Todo::findOrFail($id);
        $todo->done = $request->input('done');
        $todo->save();

        return $todo;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        Todo::destroy($id);
    }

}
