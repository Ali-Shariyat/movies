export interface RoutesFace{
    [key: string]: Route;
}

export interface Route{
    route:string,
    method:'GET'|'POST'
}