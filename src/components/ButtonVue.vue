<script setup lang="ts">
defineProps({
    text: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <button class="btn">{{ text }}</button>
</template>

<style scoped lang="sass">
.btn
    padding: 15px 30px
    font-family: 'Bebas Neue', sans-serif
    font-size: 25px
    text-transform: uppercase
    letter-spacing: 1px
    color: #fff
    background-color: #708cc4
    border-radius: 10px
    border: none
    cursor: pointer
    outline: none
</style>