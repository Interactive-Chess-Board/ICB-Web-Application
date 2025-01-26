import { SafeAreaView, View } from "react-native";
import { GameListed } from "./Components/GameListed";
import { useEffect, useState } from "react";
import { getGames } from "./config/firebase";

export default function GamesList() {
    const [games,setgames] = useState({"Game0": {BlackElo: 0, Moves: "", Result: 0, White: true, White_Elo: 0}});
    useEffect(() => {
        const fetchAndSetGames = async () => {
            try {
                const fetchedGames = await getGames();
                if (fetchedGames) {
                    setgames(fetchedGames);
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
            <View>
                {Object.keys(games).map((game) => (
                    console.log(game),
                    console.log(games[game].Result),
                    <GameListed Title={game} Result={games[game].Result} BlackElo={games[game].BlackElo} WhiteElo={games[game].WhiteElo} />
                ))}
            </View>
        </SafeAreaView>
    )
}