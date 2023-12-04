<script setup lang='ts'>
</script>

<template>
    <RouterView v-slot="{ Component }">
        <transition name="scale-slide">
            <component class="item relative" :is="Component" />
        </transition>
    </RouterView>
</template>