<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','Bank@getBanks');
Route::post('add_fav_banks','Bank@add_fav_banks');
Route::post('get_fav_banks','Bank@get_fav_banks');

Route::get('banks/{bank_id}','Bank@bank_page');
//Route::post('get_city_banks','Bank@getBanksCityVise');
