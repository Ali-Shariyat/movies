<script lang='ts' setup>
import { FetchApi } from '@/composables/api/fetch.ts'
import { RoutesApi } from '@/composables/api/routes.ts'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { Datum, MoviesFace } from '@/ts/interfaces/pages/movies.ts'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const { push } = useRouter()
const params = computed(() => ({ page: route.query?.page }))
const fetch = FetchApi<MoviesFace>('first', RoutesApi.movies, params)
const rows:Ref<Datum[]> = ref()
watch(() => fetch.state.value.data, () => {
    rows.value = fetch.state.value.data.data
    fetch.state.value.data.metadata.current_page = +fetch.state.value.data.metadata.current_page
})
const handleCurrentChange = async (e) => {
    await push({ name: 'home', query: { page: e } })
    await fetch.fetchFn()
}
onMounted(() => {
    if (!route.query?.page) {
        push({ name: 'home', query: { page: 1 } })
    }
})
const search = ref()
const filterTableData = computed(() =>
    rows.value.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase()),
    ),
)
</script>

<template>
    <div class='movies m-3'>
        <el-skeleton v-if='fetch.state.value.loading' :rows='20' animated />
        <template v-else>
            <el-table :data='filterTableData'>
                <el-table-column label='فیلم' prop='title' width='180' >
                    <template #header>
                        <el-input v-model='search' placeholder='جستجو فیلم' size='small' />
                    </template>
                </el-table-column>
                <el-table-column label='' prop='poster' width='180'>
                    <template #default='scope'>
                        <div style='display: flex; align-items: center'>
                            <el-image v-if='!!scope.row.poster' :src='scope.row.poster' class='movie-image' />
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
                v-model:current-page='fetch.state.value.data.metadata.current_page'
                v-model:page-size='fetch.state.value.data.metadata.per_page'
                :background='true'
                :disabled='false'
                :page-sizes='[fetch.state.value.data.metadata.page_count]'
                :small='false'
                :total='fetch.state.value.data.metadata.total_count'
                class='pagination'
                layout='total, sizes, prev, pager, next, jumper'
                @current-change='handleCurrentChange'
            />
        </template>
    </div>
</template>