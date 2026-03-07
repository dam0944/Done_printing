<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Home')->name('home');

Route::get('/about', fn () => Inertia::render('About'));
Route::get('/work', fn () => Inertia::render('Work'));
Route::get('/new', fn () => Inertia::render('New'));
Route::get('/contact', fn () => Inertia::render('Contact'));
Route::get('/project', fn () => Inertia::render('Project'));
Route::get('/pricing', fn () => Inertia::render('Pricing'));
Route::get('/team', fn () => Inertia::render('Team'));
Route::get('/blog', fn () => Inertia::render('Blog'));
Route::get('/single-blog', fn () => Inertia::render('SingleBlog'));

Route::fallback(fn () => Inertia::render('NotFound'));
