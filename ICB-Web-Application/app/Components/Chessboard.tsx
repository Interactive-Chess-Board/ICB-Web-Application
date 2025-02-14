import { SafeAreaView, View, StyleSheet, Dimensions, Image } from "react-native";

//Import all the pieces



const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;
const ChessRow = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ChessColumn = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ChessPieces = {
    P: require("../../assets/images/Chessboard/Piece=Pawn, Side=White.png"),
    R: require("../../assets/images/Chessboard/Piece=Rook, Side=White.png"),
    N: require("../../assets/images/Chessboard/Piece=Knight, Side=White.png"),
    B: require("../../assets/images/Chessboard/Piece=Bishop, Side=White.png"),
    Q: require("../../assets/images/Chessboard/Piece=Queen, Side=White.png"),
    K: require("../../assets/images/Chessboard/Piece=King, Side=White.png"),
    p: require("../../assets/images/Chessboard/Piece=Pawn, Side=Black.png"),
    r: require("../../assets/images/Chessboard/Piece=Rook, Side=Black.png"),
    n: require("../../assets/images/Chessboard/Piece=Knight, Side=Black.png"),
    b: require("../../assets/images/Chessboard/Piece=Bishop, Side=Black.png"),
    q: require("../../assets/images/Chessboard/Piece=Queen, Side=Black.png"),
    k: require("../../assets/images/Chessboard/Piece=King, Side=Black.png"),
}



export default function Chessboard({board}: {board: (string)[]}) {
    console.log("Board:", board);
    return(
        <View style = {styles.container}>

            {Array.from({ length: 8 }).map((_, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: "row" }}>
                    {Array.from({ length: 8 }).map((_, colIndex) => (
                        <View key={"row:" + rowIndex + "col:" + colIndex}>
                            {/* White */}
                            <View style= {rowIndex%2==0? colIndex%2==0? styles.white:styles.black :colIndex%2==1? styles.white:styles.black } id={ChessRow[rowIndex] + ChessColumn[colIndex]} />
                        </View>
                    ))}
                </View>
            ))}

            {SetUpBoard(board)}
            
        </View>
    )
}

function placePiece(row: number = 0, col: number = 0, piece: string = ChessPieces.white_p){
    // row = col%2==1?row * 30: (30*7)-30*row;
    row = row * 30;
    col = col * 30;
    if(piece == "." ){
        return(
            <View key={"row:" + row + "col:"+ col} style = {styles.chessPieceContainer}>
            </View>
        )
    }
    return(
        <View key={"row:" + row + "col:"+ col} style = {styles.chessPieceContainer}>
        <Image   style = {[styles.chessPiece, {left: 5 + row, top: 5 + col}]} source={piece} />
        </View>
    )
}

function SetUpBoard(board: (string)[] = [".","p","p","p","p","p","p","p","r","n","b",".","k","b","n",".","."]){
    let boardLayout = [];
    let index = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            boardLayout.push(placePiece(j, i, ChessPieces[board[index]]));
            index++;
        }
    }
    return boardLayout;
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        alignSelf: "center",
        marginTop: 100,
    },
    white: {
        backgroundColor: "white",
        width: 30,
        height: 30,

    },
    black: {
        width: 30,
        height: 30,
        backgroundColor: "#f5425d"
    },
    chessPiece: {
        width:20,
        height:20,
        position: "absolute",
    },
    chessPieceContainer: {
        width: 30,
        height: 30,
        position: "absolute",
    }
})