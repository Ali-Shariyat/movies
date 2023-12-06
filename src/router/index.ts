import { createRouter, createWebHistory } from 'vue-router'
import MoviesPage from '@/pages/movies/index.vue'
import MoviePage from '@/pages/movies/movie.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: MoviesPage,
        },

        {
            path: '/movie/:id',
            name: 'movie',
            component: MoviePage,
        }
    ],
})

export default router
