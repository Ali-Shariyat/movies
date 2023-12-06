<script setup lang='ts'>
import { useMovie } from '@/store/movie.store.ts'
import { computed, onMounted, ref, watch } from 'vue'

const movieStore = useMovie()
const state = computed(() => movieStore.getters.getState)
onMounted(() => {
    if (!movieStore.state.id) {
        movieStore.dispatch('fetchData')
    }
})
</script>

<template>
    <div class='movie'>
        <div class='movie-box'>
            <el-image class='poster' :src='state.poster' />
            <div class='movie-context'>
                <div v-if='state.title' class='movie-detail'>
                    <span class='title' v-text='`title: `' />
                    <span class='text' v-text='state.title' />
                </div>
                <div v-if='state.year' class='movie-detail'>
                    <span class='title' v-text='`year: `' />
                    <span class='text' v-text='state.year' />
                </div>
                <div v-if='state.released' class='movie-detail'>
                    <span class='title' v-text='`released: `' />
                    <span class='text' v-text='state.released' />
                </div>
                <div v-if='state.director' class='movie-detail'>
                    <span class='title' v-text='`director: `' />
                    <span class='text' v-text='state.director' />
                </div>
                <div v-if='state.writer' class='movie-detail'>
                    <span class='title' v-text='`writer: `' />
                    <span class='text' v-text='state.writer' />
                </div>
                <div v-if='state.actors' class='movie-detail'>
                    <span class='title' v-text='`actors: `' />
                    <span class='text' v-text='state.actors' />
                </div>
                <div v-if='state.plot' class='movie-detail'>
                    <span class='title' v-text='`plot: `' />
                    <span class='text' v-text='state.plot' />
                </div>
                <div v-if='state.country' class='movie-detail'>
                    <span class='title' v-text='`country: `' />
                    <span class='text' v-text='state.country' />
                </div>
                <div v-if='state.awards' class='movie-detail'>
                    <span class='title' v-text='`awards: `' />
                    <span class='text' v-text='state.awards' />
                </div>
                <div v-if='state.metascore' class='movie-detail'>
                    <span class='title' v-text='`metascore: `' />
                    <span class='text' v-text='state.metascore' />
                </div>
                <div v-if='state.imdb_rating' class='movie-detail'>
                    <span class='title' v-text='`imdb rating: `' />
                    <span class='text' v-text='state.imdb_rating' />
                </div>
            </div>
        </div>

    </div>
</template>