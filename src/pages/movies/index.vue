<script lang='ts' setup>
import { FetchApi } from '@/composables/api/fetch.ts'
import { RoutesApi } from '@/composables/api/routes.ts'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import type { Datum, MoviesFace, SecondMoviesFace } from '@/ts/interfaces/pages/movies.ts'
import { useRoute, useRouter } from 'vue-router'
import { filterMovies } from '@/utils/filter-movies.ts'
import { useMovie } from '@/store/movie.store.ts'

const route = useRoute()
const movieStore = useMovie()
const { push } = useRouter()
const search = ref(route.query.s)
const params = computed(() => ({ page: route.query?.page, q: search.value }))
const secondParams = computed(() => ({
    apikey: import.meta.env.VITE_API_KEY,
    plot: 'full',
    p: 'full',
    Page: route.query?.page,
    s: search.value ?? '',
}))

const fetch = FetchApi<MoviesFace>('first', RoutesApi.movies(), params)
const secondFetch = FetchApi<SecondMoviesFace>('second', RoutesApi.secondMovies, secondParams)


const rows: Ref<Datum[]> = ref([])
const paging = ref({
    current: +route.query?.page,
    pages: 0,
    total: 0,
})


//TODO:when fetch data change set row data
watch(() => [fetch.state.value.loading, secondFetch.state.value.loading], async ([newA, newB], [prevA, prevB]) => {
    rows.value = []
    paging.value.current = +route.query?.page
    if (!newA && !newB) {
        const firstMovies = fetch.state.value.data?.data ?? []
        const secondMovies = secondFetch.state.value.data?.Search ?? []
        const total = (+fetch.state.value.data.metadata.total_count + +(secondFetch.state.value.data.totalResults ?? 0))
        rows.value = filterMovies(firstMovies, secondMovies)
        paging.value.pages = Math.round(total / 10)
        paging.value.total = total
    }

})

//TODO:table events
const handleCurrentChange = async (currenctPage:number) => {
    await push({ name: 'home', query: { page: currenctPage } })
    await fetch.fetchFn()
    await secondFetch.fetchFn()
}
const searchMovies = async () => {
    push({name:'home',query:{...route.query,s:search.value}})
    await fetch.fetchFn()
    await secondFetch.fetchFn()
}
const rowEvent = (event) => {
    movieStore.state.data = {}
    push({name:'movie',params:{id:event.id},query:{api:event.api,s:search.value}})
}

//lifecycle
onMounted(() => {
    if (!route.query?.page) {
        push({ name: 'home', query: { page: 1 } })
    }
})
</script>

<template>
    <div class='movies'>
        <el-skeleton v-if='fetch.state.value.loading && rows.length === 0' :rows='20' animated />
        <template v-else>
            <el-form @submit.prevent='searchMovies' :model="search" class='search-box'>
                <el-form-item class='search-input'>
                    <el-input v-model='search' placeholder='search...' size='small' />
                </el-form-item>
                <el-button plain type='primary' @click='searchMovies'>search</el-button>
            </el-form>
            <el-table @row-click='rowEvent' :data='rows'>
                <el-table-column label='فیلم' prop='title' width='180'></el-table-column>
                <el-table-column label='' prop='poster' width='180'>
                    <template #default='scope'>
                        <div style='display: flex; align-items: center'>
                            <el-image v-if='!!scope.row.poster && scope.row.poster !== "N/A"' :src='scope.row.poster'
                                      class='movie-image' />
                            <span v-else>عکس ثبت نشده</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label='امتیاز imdb' prop='imdb_rating' />
                <el-table-column label='کشور سازنده' prop='country' />
                <el-table-column align='right'>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page='paging.current'
                :background='true'
                :disabled='false'
                :page-sizes='[10]'
                :small='false'
                :total='paging.pages'
                class='pagination'
                layout='prev, pager, next'
                @current-change='handleCurrentChange'
            />
        </template>
    </div>
</template>