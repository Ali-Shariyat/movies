import { RoutesFace } from '@/ts/interfaces/routes-face.ts'
//TODO:define api routes
export const RoutesApi: RoutesFace = {
    movies: { route: 'movies', method: 'GET' },
    secondMovies: { route: '', method: 'GET' },
}