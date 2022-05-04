// button click handler
window.addEventListener('DOMContentLoaded',()=>
{
    const boxes = Array.from(document.querySelectorAll('.box'));//it will return collection of array
    const playerDisplay =document.querySelector('#next-player');
    const resetButton = document.querySelector('#replay');
	const restartButton = document.querySelector('#reset');
	const moves =document.querySelector('#move-count');
    const resultWinner = document.querySelector('#winner-display-board');

//apply event to generate new game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer ='X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

const winningConditions =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function CheckWinnerOfTheGame(){
    let roundWon =false;
    for(let i=0; i<=7; i++)
    {
        const winnnercodition = winningConditions[i];
        const a = board[winnnercodition[0]];
        const b = board[winnnercodition[1]];
        const c = board[winnnercodition[2]];

        if(a ==='' || b ==='' || c==='')
        {
            continue;
        }
        if(a === b && b === c)
        {
            roundWon = true;
            break;
        }
    }
    if(roundWon)
    {
        announcewinner(currentPlayer ==='X'? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }

    if(!board.includes(''))
    announcewinner(TIE);
}

const announcewinner =(type) =>{
    switch(type){
        case PLAYERO_WON: resultWinner.innerHTML ='player O won';
        break;

        case PLAYERX_WON: resultWinner.innerHTML = 'player X won';
        break;

        case TIE: resultWinner.innerHTML = 'Match Tie';
    }
    resultWinner.classList.remove('hide');
};

const isValidAction = (box) =>{
    if(box.innerText ==='X' || box.innerText ==='O')
    {
        return false;
    }
    return true;
};

const updateBoard =(click) =>
{
    board[click] = currentPlayer;
}

const changePlayer = () =>
{
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`); 
}

const userAction = (box, click) => 
{
    if(isValidAction(box) && isGameActive)
    {
        box.innerText = currentPlayer;
        box.classList.add(`player${currentPlayer}`);
        updateBoard(click);
        CheckWinnerOfTheGame();
        changePlayer();
    }
}

resetBoard = () =>
{
    board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        resultWinner.classList.add('hide');

        if(currentPlayer ==='O')
        {
            changePlayer();
        }

        boxes.forEach(box =>
            {
                box.innerText ='';
                box.classList.remove('playerX');
                box.classList.remove('playerO')

            });
}

boxes.forEach((box, click)=>{
    box.addEventListener('click',() => userAction(box,click));
});

resetButton.addEventListener('click', resetBoard);
restartButton.addEventListener('click', resetBoard);

});