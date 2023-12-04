export interface MoviesFace {
    data:     Datum[];
    metadata: Metadata;
}

export interface Datum {
    id:          number;
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