import axios from 'axios'
import { apiConfig } from '@/config/api.ts'
import { Route } from '@/ts/interfaces/routes-face.ts'
import { Ref, ref } from 'vue'

interface StateFace<T> {
    data: T,
    loading: boolean,
}


export const FetchApi = function <T = unknown>(ApiName: 'first' | 'second', router: Route, params = null, body = null,autoFetch:boolean=true): {
    fetchFn: () => Promise<Ref<StateFace<T>>>;
    state: Ref<StateFace<T>>
} {
    const state: Ref<StateFace<T>> = ref({
        data: null,
        loading: false,
    })
    const Api = ApiName === "first" ? '/api/v1/' : "/omdbapi/"
    const fetchFn = ()=>{
        state.value.loading = true
        return axios({
            baseURL:Api+router.route,
            method:router.method,
            params:params?.value ?? params,
            data:body
        }).then(async (response) => {
            state.value.data = response.data
            state.value.loading = false
            return state
        })
    }
    if (autoFetch) {
        fetchFn()
    }
    return {state, fetchFn:fetchFn }

}