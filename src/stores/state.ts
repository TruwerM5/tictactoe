import { defineStore } from "pinia";
import { nextTick } from "vue";

interface UserMoves {
    x: number[];
    o: number[];
}

export const useStateStore = defineStore('state', {
    state: () => {
        return {
            currentPlayer: '',
            cells: [] as number[],
            availableCells: [1,2,3,4,5,6,7,8,9],
            victoriousEvents: [[1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7], [1,4,7], [2,5,8], [3,6,9]],
            userMoves: {x: [], o: []} as UserMoves,
            gameOver: false,
            victoryComb: [] as number[],
            isStarted: false,
            winner: '',
            countX: 0,
            countO: 0,
        }
    },
    actions: {
        async resetGame() {
            this.currentPlayer = '';
            this.cells = [1,2,3,4,5,6,7,8,9] as number[];
            this.availableCells = [1,2,3,4,5,6,7,8,9],
            this.victoriousEvents = [[1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7], [1,4,7], [2,5,8], [3,6,9]];
            this.userMoves = {x: [], o: []} as UserMoves;
            this.gameOver =  false;
            this.victoryComb = [] as number[];
            this.isStarted = false;
            this.winner = '';
        },
        startGame() {
            this.resetGame()
            .then(() => {
                this.cells = [1,2,3,4,5,6,7,8,9];
                this.isStarted = true;
            })
            
            
        },
        changePlayer() {
            this.currentPlayer === 'X' ? this.currentPlayer = 'O' : this.currentPlayer = 'X';
        },
        checkCellNotFilled(cellIndex: number): boolean {
                if(this.availableCells.find(item => item === cellIndex)) {
                this.availableCells = this.availableCells.filter((item,index) => item !== cellIndex);
                if(!this.availableCells.length) {
                    this.gameOver = true;
                }
                return true;
            }
           
            return false;
            
        },
        checkVictory(moves: number[]) {

            if(moves.length >= 3) {
                let array: number[] = [];
                
                for(let i = 0; i < this.victoriousEvents.length; i++) {
                    // Define every victorious combination value
                    let first = this.victoriousEvents[i][0];
                    let second = this.victoriousEvents[i][1];
                    let third = this.victoriousEvents[i][2];

                    //Find every victorious item in user move
                    let firstUser = moves.find(item => item === first);
                    let secondUser = moves.find(item => item === second);
                    let thirdUser = moves.find(item => item === third);
                    if(firstUser && secondUser && thirdUser) {
                        array.push(firstUser, secondUser, thirdUser);
                    }
                    
                    
                }
                
                if(!array.length) {  
                    return false;
                } 
                this.gameOver = true;
                this.victoryComb = array;
                return array;

            }

            return false;
        },
        isCellAvailable(index: number) {
            return this.availableCells.find(item => item === index) ? true : false;
        }
    }
})