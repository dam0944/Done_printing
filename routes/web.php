<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');
Route::get('/about', function () {
    return Inertia::render('About');
});
Route::get('/work', function () {
    return Inertia::render('Work');
});
Route::get('/new', function () {
    return Inertia::render('New');
});
Route::get('/contact', function () {
    return Inertia::render('Contact');
});
Route::get('/project', function () {
    return Inertia::render('Project');
});
