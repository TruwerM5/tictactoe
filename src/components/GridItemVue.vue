<script setup lang="ts">
import { ref } from 'vue';
import { useStateStore } from '@/stores/state';
const State = useStateStore();
const props = defineProps({
    index: {
        type: Number,
        required: true,
    }
});

let currentPlayer = ref('');

let isHidden = ref(State.currentPlayer.length > 0 ? false : true);

function makeMove() {
    
    if(!State.isStarted) {
        return;
    }
    let isGameOver = State.gameOver;
    if(State.checkCellNotFilled(props.index) && !isGameOver) {
        State.changePlayer();
        currentPlayer.value = State.currentPlayer;
        if(currentPlayer.value === 'X') {
            State.userMoves.x.push(props.index);
            State.userMoves.x.sort();
        } else {
            State.userMoves.o.push(props.index);
            State.userMoves.o.sort();
        }
        isHidden.value = false;
        let checkX = State.checkVictory(State.userMoves.x);
        let checkO = State.checkVictory(State.userMoves.o);
        if(!checkX && !checkO) {
            return;
        }
        if(checkX) {
            State.winner = 'X';
            State.countX++;
        }
        if(checkO) {
            State.winner = 'O';
            State.countO++;
        }

        State.currentPlayer = '';
    }
}



</script>

<template>
    <div :class="['grid-item', State.victoryComb.includes(props.index) ? 'grid-item_active': '' ]" 
    @click="makeMove" v-if="props.index">
        <span class="grid-item__inner" >
            {{ State.cells.length>0 ? currentPlayer : '' }}
        </span>
    </div>
</template>

<style scoped lang="sass">
.grid-item
    font-family: sans-serif
    background-color: #cccdcf
    color: #3c3d40
    display: flex
    justify-content: center
    align-items: center
    font-size: 50px
    font-family: 'Red Hat Display', sans-serif
    &_active
        background-color: #708cc4
</style>