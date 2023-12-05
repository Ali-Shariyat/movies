import axios from 'axios'
import { apiConfig } from '@/config/api.ts'
import { Route } from '@/ts/interfaces/routes-face.ts'
import { Ref, ref } from 'vue'

interface StateFace<T> {
    data: T,
    loading: boolean,
}


export const FetchApi = function <T = unknown>(ApiName: 'first' | 'second', router: Route, params = null, body = null): {
    fetchFn: () => Promise<Ref<StateFace<T>>>;
    state: Ref<StateFace<T>>
} {
    const state: Ref<StateFace<T>> = ref({
        data: null,
        loading: false,
    })
    const fetchFn = ()=>{
        state.value.loading = true
        return axios({
            baseURL:`/api/v1/`+router.route,
            method:router.method,
            params:params.value,
            data:body
        }).then(async (response) => {
            state.value.data = response.data
            state.value.loading = false
            return state
        })
    }
    fetchFn()
    return {state, fetchFn:fetchFn }

}