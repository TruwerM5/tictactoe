<script setup lang="ts">
import GridVue from './components/GridVue.vue';
import ButtonVue from './components/ButtonVue.vue';
import { useStateStore } from './stores/state';

const State = useStateStore();

</script>

<template>
  <div class="wrapper">
    <h1 class="title">TicTacToe</h1>
    <GridVue />
    <div class="app-info">
        <span v-if="State.isStarted && !State.gameOver"
        class="app-info__next-move">
            <span class="font-redhat">{{ State.currentPlayer === 'X' ? 'O' : 'X' }}</span> Turn
        </span>
        <div v-if="State.gameOver" class="app-info__game-over">
        
          <p v-if="State.winner" style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-block: 10px;">  
            <span class="font-redhat">{{ State.winner }} </span> wins 
          </p>
          <p v-else>Draw</p>
        </div>
        <ButtonVue v-else-if="!State.gameOver && !State.isStarted" :text="'Start game'" 
        @click="State.startGame" class="start-btn" />
        <ButtonVue v-if="State.gameOver" :text="'Play again'" @click="State.startGame" />
        <div class="score">
          <span class="score__title">Score</span>
          <div class="score__wrapper">
            <span :class="['score__inner', State.currentPlayer !== 'X' && State.isStarted ? 'active': '']">
            <span class="font-redhat">X</span>
            <span>{{ State.countX }}</span>
          </span>
          <span :class="['score__inner', State.currentPlayer !== 'O' && State.currentPlayer != '' && State.isStarted ? 'active': '']">
            <span class="font-redhat">O</span>
            <span>{{ State.countO }}</span>
          </span>
          </div>
          
        </div>
    </div>
      
  </div>
</template>

<style scoped lang="sass">
.wrapper
  height: 80vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin-block: 30px
.title
  font-family: 'Bebas Neue', sans-serif
  font-size: 50px
  text-align: center
.app-info
  font-family: 'Heebo', sans-serif
  font-size: 25px
  text-align: center
  &__game-over
    display: block
.font-redhat
  font-family: 'Red Hat Display', sans-serif
  font-size: 30px
  line-height: 1.7

.score
  margin-block-start: 30px
  &__wrapper
    display: flex
    justify-content: center
    gap: 30px
  &__inner
    display: flex
    justify-content: center
    gap: 10px
    align-items: center
    line-height: 0.6
    &.active
      border-bottom: 2px solid #708cc4

.start-btn
  margin-block: 30px
</style>
