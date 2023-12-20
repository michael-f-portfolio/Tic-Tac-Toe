/*
    GameBoard:
        gameBoardArray: [[]]
        displayGameBoard(): [][][]
                            [][][]
                            [][][]


    Player:
        name: string
        marker: 'X' || 'O'
        score: number
*/

const GameBoard = (() => {
    const gameBoardArray = [
        [{marker: ""}, {marker: ""}, {marker: ""}],
        [{marker: ""}, {marker: ""}, {marker: ""}],
        [{marker: ""}, {marker: ""}, {marker: ""}]
    ];

    const consoleDisplay = () => {
        let rowDisplay = "";
        let cellDisplay;
        let rowIndex = 1;
        gameBoardArray.forEach(row => {
            row.forEach(cell => {
                cellDisplay = `[${cell.marker}]`
                rowDisplay += cellDisplay;
            });
            console.log(`Row ${rowIndex++} : ${rowDisplay}`);
            rowDisplay = "";
        });
        console.log("--------")
    };

    const move = (player, row, column) => {
        if (gameBoardArray[row][column].marker !== "") {
            throw Error(`Move already registered at that location`);
        } else {
            gameBoardArray[row][column].marker = player.marker;
        }
    };

    const hasWon = (player) => {
        // check for row win
        if (gameBoardArray[0][0].marker === player.marker &&
            gameBoardArray[0][1].marker === player.marker &&
            gameBoardArray[0][2].marker === player.marker) {
            return true;
        } else if (gameBoardArray[1][0].marker === player.marker &&
                   gameBoardArray[1][1].marker === player.marker &&
                   gameBoardArray[1][2].marker === player.marker) {
            return true;
        } else if (gameBoardArray[2][0].marker === player.marker &&
                   gameBoardArray[2][1].marker === player.marker &&
                   gameBoardArray[2][2].marker === player.marker) {
            return true;
        }
        // check for column win
        else if (gameBoardArray[0][0].marker === player.marker &&
                 gameBoardArray[1][0].marker === player.marker &&
                 gameBoardArray[2][0].marker === player.marker) {
            return true;
        } else if (gameBoardArray[0][1].marker === player.marker &&
                   gameBoardArray[1][1].marker === player.marker &&
                   gameBoardArray[2][1].marker === player.marker) {
            return true;
        } else if (gameBoardArray[0][2].marker === player.marker &&
                   gameBoardArray[1][2].marker === player.marker &&
                   gameBoardArray[2][2].marker === player.marker) {
            return true;
        }
        // check for diagonal win
        else if (gameBoardArray[0][0].marker === player.marker &&
                 gameBoardArray[1][1].marker === player.marker &&
                 gameBoardArray[2][2].marker === player.marker) {
            return true;
        } else if (gameBoardArray[0][2].marker === player.marker &&
                   gameBoardArray[1][1].marker === player.marker &&
                   gameBoardArray[2][0].marker === player.marker) {
            return true;
        } else {
            return false;
        }
    };

    return {consoleDisplay, move, hasWon};
})();

const PlayerFactory = (() => {
    const createPlayer = (name, marker) => {
        if (marker !== "x" && marker !== "o") {
            throw Error(`$Invalid Marker: Must be "x" or "o" but was "${marker}"`);
        }
        return {name, marker};
    };

    return {createPlayer};
})();

const GameController = (() => {
    const startGame = () => {
        const player1 = PlayerFactory.createPlayer("bob", "x");
        const player2 = PlayerFactory.createPlayer("joe", "o");
        let currentPlayer = player1;
        let row, column;
        let hasWon = false;
        do {
            row = parseInt(prompt(`${currentPlayer.name}'s move, which row?`));
            column = parseInt(prompt(`${currentPlayer.name}'s move, which column?`));
            try {
                GameBoard.move(currentPlayer, row, column);
                GameBoard.consoleDisplay();
                if (GameBoard.hasWon(currentPlayer)) {
                    hasWon = true;
                } else {
                    if (currentPlayer.marker === player1.marker) {
                        currentPlayer = player2;
                    } else if (currentPlayer.marker === player2.marker){
                        currentPlayer = player1;
                    }
                }
            } catch (error) {
                alert(error);
            }
        } while (!hasWon);
        alert(`${currentPlayer.name} has won!`);
    }

    return {startGame};
})();

// GameController.startGame();