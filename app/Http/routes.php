<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/api/v1/employees/{id?}', 'Employees@index');
Route::post('/api/v1/employees', 'Employees@store');
Route::put('/api/v1/employees/{id}', 'Employees@update');
Route::delete('/api/v1/employees/{id}', 'Employees@destroy');

Route::resource("tasks","TaskController");
Route::group(array('prefix' => 'api/v1'), function()
{
    Route::resource('tasks', 'API\TaskController');
    Route::resource('employees', 'API\Employees');
});


Route::resource('api/v1/todos','API\TodosController');
Route::get('todoapp','TodoAppController@index');