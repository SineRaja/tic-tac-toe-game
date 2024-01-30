// DOM elements
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Game state variables
let currentPlayer = 'X';
let computerPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Handle player's move when a cell is clicked
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    // Check if the cell is already occupied or the game is not active
    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    // Make the player's move
    makeMove(cellIndex, currentPlayer);

    // Check for a winner or draw
    if (checkWinner(gameBoard) === currentPlayer) {
        message.textContent = 'You win!';
        gameActive = false;
    } else if (gameBoard.includes('')) {
        currentPlayer = 'X';
        setTimeout(computerMove, 500); // Delay the computer's move for a better user experience
    } else {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

// Handle computer's move
function computerMove() {
    const emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    // Make the computer's move if there are empty cells
    if (emptyCells.length > 0) {
        const bestMove = getBestMove();
        makeMove(bestMove, computerPlayer);
    }

    // Check for a winner or draw after the computer's move
    if (checkWinner(gameBoard) === computerPlayer) {
        message.textContent = 'Computer wins!';
        gameActive = false;
    } else if (!gameBoard.includes('')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

// Determine the computer's best move using the minimax algorithm
function getBestMove() {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = computerPlayer;
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

// Minimax algorithm for determining the best move
function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -1,
        O: 1,
        draw: 0
    };

    let result = checkWinner(board);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = computerPlayer;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = currentPlayer;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Check for a winner or draw on the current board
function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    // If no winner and no empty cells, it's a draw; otherwise, return null
    if (board.includes('')) {
        return null;
    } else {
        return 'draw';
    }
}

// Make a move on the board and update the display
function makeMove(index, player) {
    gameBoard[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player);
}

// Handle the reset button click to restart the game
function handleResetClick() {
    // Reset game state and display
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = 'You are X, it\'s your turn';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetClick);
