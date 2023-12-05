<script lang='ts' setup>
import { FetchApi } from '@/composables/api/fetch.ts'
import { RoutesApi } from '@/composables/api/routes.ts'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { Datum, MoviesFace } from '@/ts/interfaces/pages/movies.ts'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const { push } = useRouter()
const search = ref()
const params = computed(() => ({ page: route.query?.page, q: search.value }))
const secondParams = computed(() => ({
    apikey: import.meta.env.VITE_API_KEY,
    plot: 'full',
    Page: route.query?.page,
    s: search.value ?? 'a',
}))

const fetch = FetchApi<MoviesFace>('first', RoutesApi.movies, params)
const secondFetch = FetchApi<any>('second', RoutesApi.secondMovies, secondParams)


const rows: Ref<Datum[]> = ref()
const paging = ref({
    current: +route.query?.page,
    pages: 0,
    total: 0,
})

//TODO:filterMovies ==> merge api data
const filterMovies = (firstMovies, secondMovies) => {
    const firstList = firstMovies.map((item) => {
        if (secondMovies?.length) {
            if (!secondMovies.map((second) => second.Title).includes(item.title)) {
                return item
            }
        } else {
            return item
        }
    }).filter((item) => !!item)
    const secondList = secondMovies?.map((item, index) => {
        if (firstMovies.length) {
            if (!firstMovies.map((second) => second.title).includes(item.Title)) {
                return ({
                    title: item.Title,
                    poster: item.Poster,
                })
            }
        } else {
            return ({
                title: item.Title,
                poster: item.Poster,
            })
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

//TODO:when fetch data change set row data
watch(() => [fetch.state.value.loading, secondFetch.state.value.loading], async ([newA, newB], [prevA, prevB]) => {
    rows.value = []
    paging.value.current = +route.query?.page
    if (!newA && !newB) {
        const firstMovies = fetch.state.value.data?.data ?? []
        const secondMovies = secondFetch.state.value.data?.Search ?? []
        const total = (+fetch.state.value.data.metadata.total_count + +(secondFetch.state.value.data.totalResults??0))
        rows.value = filterMovies(firstMovies, secondMovies)
        console.log(Math.round(total / 10),total)
        paging.value.pages = Math.round(total / 10)
        paging.value.total = total
    }

})
const handleCurrentChange = async (e) => {
    await push({ name: 'home', query: { page: e } })
    await fetch.fetchFn()
    await secondFetch.fetchFn()
}
const searchMovies = async () => {
    await fetch.fetchFn()
    await secondFetch.fetchFn()
}
const filterTableData = computed(() =>
    rows.value?.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase()),
    ),
)

//lifecycle
onMounted(() => {
    if (!route.query?.page) {
        push({ name: 'home', query: { page: 1 } })
    }
})
</script>

<template>
    <div class='movies m-3' dir='rtl'>
        <el-skeleton v-if='fetch.state.value.loading' :rows='20' animated />
        <template v-else>
            <div class='search-box'>
                <el-input v-model='search' placeholder='جستجو فیلم' size='small' />
                <el-button plain type='primary' @click='searchMovies'>جستجو</el-button>
            </div>
            <el-table :data='rows'>
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
            {{paging.total}}
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