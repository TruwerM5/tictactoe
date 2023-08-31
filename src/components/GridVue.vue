<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import GridItemVue from './GridItemVue.vue';


const State = useStateStore();
</script>

<template>
    <div class="grid">
        <GridItemVue 
        v-if="State.isStarted"
        v-for="item,i in State.cells" :key="item" :index="item" />
    </div>
    
</template>

<style scoped lang="sass">
.grid
    min-width: 300px
    height: 300px
    justify-content: center
    align-content: center
    display: grid
    grid-template-columns: repeat(3,minmax(60px, 80px))  
    grid-template-rows: repeat(3, minmax(60px, 80px)) 
    gap: 3px
    width: fit-content
    margin: 0 auto

    
</style>