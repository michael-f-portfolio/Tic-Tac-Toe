const GameBoard = (() => {
    const createGameBoard = () => {
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

        let hasWinner;

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
            hasWinner = false;
            console.log(windowGameBoardArray);
        };

        const windowMove = (player, position) => {
            if (!hasWinner) {
                const [positionY, positionX] = position.split(":");
                // console.log({positionY, positionX});
                if (windowGameBoardArray[positionY][positionX].elementPlayer.marker === "empty") {
                    windowGameBoardArray[positionY][positionX].elementPlayer = player;
                    if (windowHasWon(player)) {
                        hasWinner = true;
                        return "winner";
                    } else {
                        return "continue"
                    }
                }
                return "invalid";
            }
        };

        const windowHasWon = (player) => {
            // check for row win
            if (windowGameBoardArray[0][0].elementPlayer.marker === player.marker &&
                windowGameBoardArray[0][1].elementPlayer.marker === player.marker &&
                windowGameBoardArray[0][2].elementPlayer.marker === player.marker) {
                hasWinner = true;
            } else if (windowGameBoardArray[1][0].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[1][1].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[1][2].elementPlayer.marker === player.marker) {
                hasWinner = true;
            } else if (windowGameBoardArray[2][0].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[2][1].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[2][2].elementPlayer.marker === player.marker) {
                hasWinner = true;
            }
            // check for column win
            else if (windowGameBoardArray[0][0].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[1][0].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[2][0].elementPlayer.marker === player.marker) {
                hasWinner = true;
            } else if (windowGameBoardArray[0][1].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[1][1].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[2][1].elementPlayer.marker === player.marker) {
                hasWinner = true;
            } else if (windowGameBoardArray[0][2].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[1][2].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[2][2].elementPlayer.marker === player.marker) {
                hasWinner = true;
            }
            // check for diagonal win
            else if (windowGameBoardArray[0][0].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[1][1].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[2][2].elementPlayer.marker === player.marker) {
                hasWinner = true;
            } else if (windowGameBoardArray[0][2].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[1][1].elementPlayer.marker === player.marker &&
                    windowGameBoardArray[2][0].elementPlayer.marker === player.marker) {
                hasWinner = true;
            } else {
                hasWinner = false;
            }

            return hasWinner;
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
    }
    return {createGameBoard};
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
    const createGameController = () => {
        let gameBoard, player1, player2, currentPlayer, gameState;
        const initializeConsoleGame = (player1, player2) => {
            gameBoard = GameBoard.createGameBoard();
            let currentPlayer = player1;
            let row, column;
            let hasWon = false;
            do {
                row = parseInt(prompt(`${currentPlayer.name}'s move, which row?`));
                column = parseInt(prompt(`${currentPlayer.name}'s move, which column?`));
                try {
                    gameBoard.consoleMove(currentPlayer, row, column);
                    gameBoard.consoleDisplay();
                    if (gameBoard.consoleHasWon(currentPlayer)) {
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
            gameBoard = GameBoard.createGameBoard();
            player1 = PlayerFactory.createPlayer(player1Name, "x");
            player2 = PlayerFactory.createPlayer(player2Name, "o");
            currentPlayer = player1;
            hasWinner = false;
            gameBoard.initializeGameBoard();
        };

        const playerMove = (elementPosition) => {
            // console.log({currentPlayer, elementPosition})

            gameState = gameBoard.windowMove(currentPlayer, elementPosition);
            if (gameState === "continue") {
                currentPlayer = currentPlayer.marker === "x" ? player2 : player1;
                return gameState;
            } else if (gameState === "winner") {
                return gameState;
            } else if (gameState === "invalid") {
                return gameState;
            }
        };

        const declareWinner = () => { return hasWinner; };
        const getCurrentPlayer = () => { return currentPlayer };

        return {initializeConsoleGame, initializeWindowGame, playerMove, getCurrentPlayer, declareWinner};
    }
    return {createGameController};
})();

const DisplayController = (() => {
    let gameController, displayIsLoaded;
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
            const playerOneNameInput = document.querySelector("#playerOne");
            const playerTwoNameInput = document.querySelector("#playerTwo");
            const playerOneDisplay = document.querySelector("#playerOneDisplay");
            const playerTwoDisplay = document.querySelector("#playerTwoDisplay");
            const versusText = document.querySelector("#versusText");
            versusText.removeAttribute("hidden");
            playerOneDisplay.textContent = playerOneNameInput.value;
            playerTwoDisplay.textContent = playerTwoNameInput.value;
            gameController = GameController.createGameController();
            gameController.initializeWindowGame(playerOneNameInput.value, playerTwoNameInput.value);
            addGameBoardEvents();
            playerOneNameInput.value = "";
            playerTwoNameInput.value = "";
            displayIsLoaded = true;
            newGameDialog.close();
        });

        const resetGameButton = document.querySelector("#resetGameButton");
        // Reset Game (keep play names)
        resetGameButton.addEventListener("click", () => {
            if (displayIsLoaded) {
                const playerOneDisplay = document.querySelector("#playerOneDisplay");
                const playerTwoDisplay = document.querySelector("#playerTwoDisplay");
                gameController.initializeWindowGame(playerOneDisplay.textContent, playerTwoDisplay.textContent);
                addGameBoardEvents();
            }
        });
    }

    function addGameBoardEvents() {
        const gameBoardElements = document.querySelectorAll(".game-board div");
        const messageDisplay = document.querySelector(".message-display");
        messageDisplay.textContent = "";
        gameBoardElements.forEach(gameBoardElement => {
            gameBoardElement.textContent = "";
            if (!displayIsLoaded) {
                gameBoardElement.addEventListener("click", (event) => {
                    const currentPlayer = gameController.getCurrentPlayer();
                    const gameState = gameController.playerMove(event.target.id)
                    if (gameState === "continue") {
                        event.target.textContent = currentPlayer.marker;
                    } else if (gameState === "winner") {
                        event.target.textContent = currentPlayer.marker;
                        messageDisplay.textContent = `${currentPlayer.name} wins!`;
                    } else if (gameState === "invalid") {
                        messageDisplay.textContent = `Invalid move, try again ${currentPlayer.name}`;
                    }
                });
            }
        });

    }
    return {initializeDisplay};
})();

DisplayController.initializeDisplay();