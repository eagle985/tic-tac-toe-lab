//console.log("help")

/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/


let board;  //track state of the squares
let turn;   //track whose turn it is
let winner; //track who won
let tie;  //track if a tie


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
console.log(squareEls);

const messageEl = document.querySelector('#message');
console.log(messageEl);

const resetBtnEl = document.querySelector('#resetButton')

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    console.log('Game Started');

    board = ['', '', '', '', '', '', '', '', ''];

    turn = 'X';

    winner = false;

    tie = false;

    render = () => {
        updateMessage()
    }
    render()
}
// write a function to switch turns

const switchTurn = () => {
    if (turn === "X") {
        turn = "O"
    } else {
        turn = "X"
    }
    updateMessage()
}


const checkWin = () => {
    //iterate thru winningCombos
    for (i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i]
        let firstIndex = combo[0]
        let secondIndex = combo[1]
        let thirdIndex = combo[2]
        if (board[firstIndex] == "" || board[secondIndex] == "" || board[thirdIndex] == "") {
            continue
        }
        if (board[firstIndex] === board[secondIndex] && board[secondIndex] === board[thirdIndex]) {
            console.log("Win")
            return true
        }
    }
    //console.log("tie")
    return false
    //make a variable for the subarray
    //make a variable to track check board array - check letter in first index in subarray     
    //check if 1st and 2nd are equal, 
    // if true - go to 3rd check if 1, 2 and 3 are equal
    // if true = return true
    //return false
}

//check for a cat's game
//if win is not true - check for a win 
//check for a catgame 

const catGame = () => {
    for (i = 0; i < board.length; i++) {
        if (board[i] == "") {
            return false
        }
    }
    return true
}

const handleBoxClick = (e) => {
    console.log(e.target.id)
    //if space empty add letter
    //if empty string then add turn
    if (e.target.textContent === "") {
        e.target.textContent = turn;
        board[e.target.id] = turn;

        const winnerFound = checkWin()
        if (winnerFound) {
            winner = true   //if winnerfound update winner to be true
            updateMessage()   //use updateMessage function  
            return
        }
        const tieDeclared = catGame()
        if (tieDeclared) {
            tie = true
            updateMessage()
            return
        }
        switchTurn()
    }
}


//on click get X or O added to box
//after every click check for a win   give message
//switch turns
//check for full board - reset game function


const updateMessage = () => {
    if (winner) {
        messageEl.textContent = `${turn} has won!`
    }
    else if (tie) {
        messageEl.textContent = 'It is a tie!'
    }
    else {
        messageEl.textContent = `It is ${turn}'s turn!`
    }
}

const resetGame = () => {
    board = null;
    turn = null;
    winner = null;
    tie = null;
    squareEls.forEach(tile => {
        tile.textContent = ""
    }
)
    init()
}


/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(box => {
    box.addEventListener('click', handleBoxClick)
})

resetBtnEl.addEventListener("click", resetGame)

init()




//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
