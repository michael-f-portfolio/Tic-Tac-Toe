const GameBoard = (() => {
    const consoleGameBoardArray = [
        [{marker: ""}, {marker: ""}, {marker: ""}],
        [{marker: ""}, {marker: ""}, {marker: ""}],
        [{marker: ""}, {marker: ""}, {marker: ""}]
    ];

    const windowGameBoardArray = [
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
    ];

    const createGameElement = (elementId) => {
        const elementPosition = elementId;
        const elementPlayer = PlayerFactory.createPlayer("empty", "empty");
        const getElementPosition = () => elementPosition;
        return {getElementPosition, elementPlayer};
    }

    const initializeGameBoard = () => {
        let x = 0, y = 0;
        windowGameBoardArray.forEach((row, yIndex) => {
            y = yIndex;
            row.forEach((cell, xIndex) => {
                x = xIndex;
                windowGameBoardArray[yIndex][xIndex] = createGameElement(`${y}:${x}`);
            });
        });
    };

    const windowMove = (player, position) => {

    };

    const consoleDisplay = () => {
        let rowDisplay = "";
        let cellDisplay;
        let rowIndex = 1;
        consoleGameBoardArray.forEach(row => {
            row.forEach(cell => {
                cellDisplay = `[${cell.marker}]`
                rowDisplay += cellDisplay;
            });
            console.log(`Row ${rowIndex++} : ${rowDisplay}`);
            rowDisplay = "";
        });
        console.log("--------")
    };

    const consoleMove = (player, row, column) => {
        if (consoleGameBoardArray[row][column].marker !== "") {
            throw Error(`Move already registered at that location`);
        } else {
            consoleGameBoardArray[row][column].marker = player.marker;
        }
    };

    const consoleHasWon = (player) => {
        // check for row win
        if (consoleGameBoardArray[0][0].marker === player.marker &&
            consoleGameBoardArray[0][1].marker === player.marker &&
            consoleGameBoardArray[0][2].marker === player.marker) {
            return true;
        } else if (consoleGameBoardArray[1][0].marker === player.marker &&
                   consoleGameBoardArray[1][1].marker === player.marker &&
                   consoleGameBoardArray[1][2].marker === player.marker) {
            return true;
        } else if (consoleGameBoardArray[2][0].marker === player.marker &&
                   consoleGameBoardArray[2][1].marker === player.marker &&
                   consoleGameBoardArray[2][2].marker === player.marker) {
            return true;
        }
        // check for column win
        else if (consoleGameBoardArray[0][0].marker === player.marker &&
                 consoleGameBoardArray[1][0].marker === player.marker &&
                 consoleGameBoardArray[2][0].marker === player.marker) {
            return true;
        } else if (consoleGameBoardArray[0][1].marker === player.marker &&
                   consoleGameBoardArray[1][1].marker === player.marker &&
                   consoleGameBoardArray[2][1].marker === player.marker) {
            return true;
        } else if (consoleGameBoardArray[0][2].marker === player.marker &&
                   consoleGameBoardArray[1][2].marker === player.marker &&
                   consoleGameBoardArray[2][2].marker === player.marker) {
            return true;
        }
        // check for diagonal win
        else if (consoleGameBoardArray[0][0].marker === player.marker &&
                 consoleGameBoardArray[1][1].marker === player.marker &&
                 consoleGameBoardArray[2][2].marker === player.marker) {
            return true;
        } else if (consoleGameBoardArray[0][2].marker === player.marker &&
                   consoleGameBoardArray[1][1].marker === player.marker &&
                   consoleGameBoardArray[2][0].marker === player.marker) {
            return true;
        } else {
            return false;
        }
    };

    return {initializeGameBoard, windowMove, consoleDisplay, consoleMove, consoleHasWon};
})();

const PlayerFactory = (() => {
    const createPlayer = (name, marker) => {
        // if (marker !== "x" && marker !== "o") {
        //     throw Error(`$Invalid Marker: Must be "x" or "o" but was "${marker}"`);
        // }
        return {name, marker};
    };

    return {createPlayer};
})();

const GameController = (() => {
    let player1, player2, currentPlayer;
    const initializeConsoleGame = (player1, player2) => {
        let currentPlayer = player1;
        let row, column;
        let hasWon = false;
        do {
            row = parseInt(prompt(`${currentPlayer.name}'s move, which row?`));
            column = parseInt(prompt(`${currentPlayer.name}'s move, which column?`));
            try {
                GameBoard.consoleMove(currentPlayer, row, column);
                GameBoard.consoleDisplay();
                if (GameBoard.consoleHasWon(currentPlayer)) {
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

    const initializeWindowGame = (player1Name, player2Name) => {
        console.log("game started");
        player1 = PlayerFactory.createPlayer(player1Name, "x");
        player2 = PlayerFactory.createPlayer(player2Name, "o");
        currentPlayer = player1;
        GameBoard.initializeGameBoard();
    };

    const playerMove = (elementPosition) => {
        GameBoard.windowMove(currentPlayer, elementPosition);
        if (currentPlayer.marker === "x") {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    return {initializeConsoleGame, initializeWindowGame, playerMove};
})();

const DisplayController = (() => {
    const initializeDisplay = () => {
        addModalEvents();
    };

    function addModalEvents() {
        // Show Modal
        const newGameDialogButton = document.querySelector("#newGameButton");
        const newGameDialog = document.querySelector("#newGameDialog");
        newGameDialogButton.addEventListener("click", () => newGameDialog.showModal());

        // Hide Modal
        const cancelNewGameButton = document.querySelector("#cancelNewGameButton");
        const newGameContainerDiv = document.querySelector(".new-game-container");
        cancelNewGameButton.addEventListener("click", () => newGameDialog.close());
        newGameDialog.addEventListener("click", () => newGameDialog.close());
        newGameContainerDiv.addEventListener("click", (event) => event.stopPropagation());

        // Start Game
        const confirmNewGameButton = document.querySelector("#confirmNewGameButton");
        confirmNewGameButton.addEventListener("click", () => {
            const player1Name = document.querySelector("#playerOne");
            const player2Name = document.querySelector("#playerTwo");
            GameController.initializeWindowGame(player1Name.value, player2Name.value);
            addGameBoardEvents();
            player1Name.value = "";
            player2Name.value = "";
            newGameDialog.close();
        });
    }

    function addGameBoardEvents() {
        const gameBoardElements = document.querySelectorAll(".game-board div");
        gameBoardElements.forEach(gameBoardElement => {
           gameBoardElement.addEventListener("click", (event) => {
                console.log(event);
                GameController.playerMove(event.target.id);
           });
        });
    }

    return {initializeDisplay};
})();

DisplayController.initializeDisplay();