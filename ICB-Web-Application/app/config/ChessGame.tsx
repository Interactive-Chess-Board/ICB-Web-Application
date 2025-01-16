import {Chess} from "chess.js";

export default function ChessGame(moves: string){
    let boards = [""];
    //initialize a new chess game
    const game = new Chess();

    //split moves into an array of moves
    const moveList = moves.split(" ");

    //iterate through the moves and add them to the board
    moveList.forEach(move => {
        game.move(move);
        boards.push(game.fen());
    });
    console.log(boards);
    return boards;

    
}
