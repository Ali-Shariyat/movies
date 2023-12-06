import type { MoviesFace } from '@/ts/interfaces/pages/movies.ts'
import { SearchFace } from '@/ts/interfaces/pages/movies.ts'
import { convertKeysToLowerCase } from '@/utils/to-lower-case.ts'

//TODO:filterMovies ==> merge api data

export const filterMovies = (firstMovies:MoviesFace, secondMovies:SearchFace) => {
    const firstList = firstMovies.map((item) => {
        if (secondMovies?.length) {
            if (!secondMovies.map((second) => second.Title).includes(item.title)) {
                return { ...item,api:'first' }
            }
        } else {
            return { ...item,api:'first' }
        }
    }).filter((item) => !!item)
    const secondList = secondMovies?.map((item, index) => {
        if (firstMovies.length) {
            if (!firstMovies.map((second) => second.title).includes(item.Title)) {
                return ({ ...convertKeysToLowerCase(item), id:item.imdbID,api:'second' })
            }
        } else {
            return ({ ...convertKeysToLowerCase(item), id:item.imdbID,api:'second' })
        }
    }).filter((item) => !!item)
    let movies = []
    if (secondList) {
        movies = [...movies, ...secondList]
    }
    if (firstList) {
        movies = [...movies, ...firstList]
    }
    return movies
}