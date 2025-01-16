import { SafeAreaView, View} from "react-native";
import Chessboard from "./Components/Chessboard";
import { getGames } from "./config/firebase";
import { useState, useEffect } from "react";

export default function Game(){
    const [board, setBoard] = useState(["p"]);
    let Game: string[] = ["p"];

    useEffect(() => {
        const fetchAndSetBoard = async () => {
            let Game = await FetchGames();
            if (Game) {
                setBoard(Game);
            }
        };
        fetchAndSetBoard();
    }, []);
    return(
    <SafeAreaView>
        <Chessboard board = {board} />
    </SafeAreaView>
    )
}

async function FetchGames(){
    let RawData = await  getGames();
    let TransformedStr: string = "";
    if (RawData) {
        console.log(RawData["Game 0"]);
        TransformedStr = RawData["Game 0"]
    } else {
        
        console.error("RawData is undefined");
    }

    //Remove all other charachters except commas to form a list of strings
    TransformedStr = TransformedStr.replace(/"/g, '');
    //Remove the first and last bracket
    TransformedStr = TransformedStr.substring(1, TransformedStr.length - 1);

    let Game:string[] = TransformedStr.split(",");
    console.log(TransformedStr);
    console.log(Game);
    return Game;
}