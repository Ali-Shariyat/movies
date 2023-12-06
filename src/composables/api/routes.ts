import { RoutesFace } from '@/ts/interfaces/routes-face.ts'
//TODO:define api routes
export const RoutesApi: RoutesFace = {
    movies: (id: number) => ({ route:  !!id ? 'movies/' + id : '/movies', method: 'GET' }),
    secondMovies: { route: '', method: 'GET' },
}