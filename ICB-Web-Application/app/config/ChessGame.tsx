const { Chess } = require("chess.js");

function fenToBoard(fen: string) {
    const [position] = fen.split(' '); // Extract the piece placement from FEN
    const rows = position.split('/'); // Split into rows
    const formatedBoard = [];
    const board = rows.map(row => {
        const expandedRow = [];
        for (let char of row) {
            if (isNaN(Number(char))) {
                expandedRow.push(char); // Push the piece
            } else {
                expandedRow.push(...Array(Number(char)).fill('')); // Fill empty squares
            }
        }
        return expandedRow;
    });

    // Flatten the board and replace empty squares with '.' to fit the expected output
    for(let i=0;i<board.length;i++) {
        for(let j=0;j<board[i].length;j++) {
            if(board[i][j] === "") {
                formatedBoard.push(".");
            }
            else{
                formatedBoard.push(board[i][j]);
            }
        }
    }
    return formatedBoard;
}

export function ChessGame(moves: string[]) {
    let boards: string[] = [];
    const game = new Chess();
    boards.push("rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR");
    moves.forEach(move => {
        game.move(move);
        console.log("FEN: ", game.fen());
        boards.push(game.fen());
    });

    for(let i = 0; i < boards.length; i++) {
        const boardArray = fenToBoard(boards[i]);
        console.log("Board Array: ", boardArray);
        boards[i] = boardArray.join('');
    }
    return boards;
}

