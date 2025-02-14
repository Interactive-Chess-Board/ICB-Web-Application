import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import { GameListed } from "./Components/GameListed";
import { useEffect, useState } from "react";
import { getGames } from "./config/firebase";

interface Game {
    BlackElo: number;
    Moves: string;
    Result: number;
    White: boolean;
    White_Elo: number;
}

interface Games {
    [key: string]: Game;
}

    //get the hight and width of the screen
    const dimensions = Dimensions.get('window');
    const Height = dimensions.height;
    const Width = dimensions.width;

export default function GamesList() {
    let counter = 0;

    

    const [games, setGames] = useState<Games>({"Game0": {BlackElo: 0, Moves: "", Result: 0, White: true, White_Elo: 0}});
    useEffect(() => {
        const fetchAndSetGames = async () => {
            try {
                const fetchedGames = await getGames();
                if (fetchedGames) {
                    setGames((prevGames) => ({ ...prevGames, ...fetchedGames })); // Merge old + new games
                } else {
                    console.error("No games fetched!");
                }
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchAndSetGames();
    }, []);
    return(
        <SafeAreaView>

            <View style={styles.TopBar}>
                <Text style={styles.Title}>Past Games</Text>
            </View>

            <ScrollView>
                <View>
                {Object.keys(games).map((game, index) => (
                        counter = index,
                        <GameListed
                            key={game}
                            Title={game}
                            Result={games[game].Result}
                            BlackElo={games[game].BlackElo}
                            WhiteElo={games[game].White_Elo}
                            GameNum={index} // Use index instead of counter
                        />
                    ))}
                <GameListed Title={"Game"+ counter} Result={0} BlackElo={1200} WhiteElo={1300} GameNum={counter}/>

                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TopBar:{
        height: Height*0.25,
        width: Width,
        borderWidth: 1,
        borderColor:"#FF4E4E",
        borderRadius: 10,
        backgroundColor: "white"

    },
    Title:{
        fontSize: 24,
        fontWeight: '900',
        marginTop: "30%",
        alignSelf: 'center',
    }
});