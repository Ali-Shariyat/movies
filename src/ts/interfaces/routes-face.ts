export interface RoutesFace{
    [key: string]: Route|Function;
}

export interface Route{
    route:string,
    method:'GET'|'POST'
}