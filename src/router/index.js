import AddMovieView from '@/views/AddMovieView.vue';
import EditMovieView from '@/views/EditMovieView.vue';
import HomeView from '@/views/HomeView.vue';
import MoviesView from '@/views/MoviesView.vue';
import MovieView from '@/views/MovieView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/movies',
            name: 'movies',
            component: MoviesView,
        },
        {
            path: '/movies/:id',
            name: 'movie',
            component: MovieView,
        },
        {
            path: '/movies/edit/:id',
            name: 'edit-movie',
            component: EditMovieView,
        },
        {
            path: '/movies/add',
            name: 'add-movie',
            component: AddMovieView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        },
    ],
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;