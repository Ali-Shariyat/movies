import { TypeEnum } from '@/ts/enums/pages/movies.ts'

export interface MoviesFace {
    data:     Datum[];
    metadata: Metadata;
}

export interface Datum {
    id:          number | null;
    title:       string;
    poster:      string;
    year:        string;
    country:     string;
    imdb_rating: string;
    genres:      string[];
    images:      string[];
}

export interface Metadata {
    current_page: string | number;
    per_page:     number;
    page_count:   number;
    total_count:  number;
}



export interface SecondMoviesFace {
    search:       SearchFace[];
    totalResults: string;
    response:     string;
}

export interface SearchFace {
    Title:  string;
    Year:   string;
    imdbID: string;
    Type:   TypeEnum;
    Poster: string;
}
