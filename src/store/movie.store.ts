import { createStore, Store, MutationTree, ActionTree, GetterTree } from 'vuex'
import { RootState, State } from '@/types/store'
import { Datum } from '@/ts/interfaces/pages/movies.ts'
import { FetchApi } from '@/composables/api/fetch.ts'
import { RoutesApi } from '@/composables/api/routes.ts'
import { useRoute } from 'vue-router'
import { convertKeysToLowerCase } from '@/utils/to-lower-case.ts'

const mutations: MutationTree<State> = {
    setState(state, data) {
        state.data = data
    },
}

const actions: ActionTree<State, RootState> = {
    fetchData({ commit }) {
        const route = useRoute()
        if (!state.data.id) {
            const fetch = FetchApi<Datum>(route.query.api, route.query.api === 'first' ? RoutesApi.movies(route.params.id) : RoutesApi.secondMovies, route.query.api === 'first' ? null : { i: route.params.id, apikey: import.meta.env.VITE_API_KEY }, null, false)
            fetch.fetchFn().then(() => {
                console.log(fetch.state.value.data)
                if (route.query.api === 'first') {
                    commit('setState', fetch.state.value.data)
                } else {
                    commit('setState', convertKeysToLowerCase(fetch.state.value.data))
                }
            })
        }
    },
}

const getters: GetterTree<State, RootState> = {
    getState(state) {
        return state.data
    },
}

const state: any = {
    data: {
        id: null,
    },
}

export const store = createStore({
    state,
    mutations,
    actions,
    getters,
})

export function useMovie(): Store<RootState> {
    return store as Store<RootState>
}