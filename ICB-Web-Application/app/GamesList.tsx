import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { GameListed } from "./Components/GameListed";
import { useEffect, useState } from "react";
import { getGames } from "./config/firebase";

interface Game {
    "Black Elo": number;
    Moves: string;
    Result: number;
    White: boolean;
    "White Elo": number;
}

interface Games {
    [key: string]: Game;
}

    //get the hight and width of the screen
    const dimensions = Dimensions.get('window');
    const Height = dimensions.height;
    const Width = dimensions.width;
    const GAMES_PER_PAGE = 5;
    const MAX_VISIBLE_PAGES = 5;

export default function GamesList() {
    const [games, setGames] = useState<Games>({"Game0": {"Black Elo": 0, Moves: "", Result: 0, White: true, "White Elo": 0}});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAndSetGames = async () => {
            try {
                let fetchedGames = await getGames();
                if (fetchedGames) {
                    const gameKeys = Object.keys(fetchedGames);
                    const gamesWithoutFirst = gameKeys.slice(1).reduce((acc, key) => {
                        acc[key] = fetchedGames[key];
                        return acc;
                    }, {} as Games);
                    setGames(gamesWithoutFirst);
                    console.log(gamesWithoutFirst["Game1"]["White Elo"]);
                    // Calculate total pages
                    const totalGames = Object.keys(gamesWithoutFirst).length;
                    setTotalPages(Math.ceil(totalGames / GAMES_PER_PAGE));
                } else {
                    console.error("No games fetched!");
                }
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchAndSetGames();
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const getCurrentPageGames = () => {
        const gameKeys = Object.keys(games);
        const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
        const endIndex = startIndex + GAMES_PER_PAGE;
        return gameKeys.slice(startIndex, endIndex);
    };

    const getVisiblePages = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);
        
        if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
            startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.TopBar}>
                <Text style={styles.Title}>Past Games</Text>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {getCurrentPageGames().map((game, index) => (
                        <GameListed
                            key={game}
                            Title={game}
                            Result={games[game].Result}
                            BlackElo={games[game]["Black Elo"]}
                            WhiteElo={games[game]["White Elo"]}
                            GameNum={(currentPage - 1) * GAMES_PER_PAGE + index+1}
                        />
                    ))}
                </ScrollView>

                <View style={styles.paginationContainer}>
                    <TouchableOpacity 
                        style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                        onPress={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <Text style={styles.paginationButtonText}>←</Text>
                    </TouchableOpacity>

                    {getVisiblePages().map((page) => (
                        <TouchableOpacity
                            key={page}
                            style={[
                                styles.pageNumberButton,
                                currentPage === page && styles.pageNumberButtonActive
                            ]}
                            onPress={() => handlePageClick(page)}
                        >
                            <Text style={[
                                styles.pageNumberText,
                                currentPage === page && styles.pageNumberTextActive
                            ]}>
                                {page}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    
                    <TouchableOpacity 
                        style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                        onPress={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <Text style={styles.paginationButtonText}>→</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    TopBar:{
        height: Height*0.15,
        width: Width,
        borderWidth: 1,
        borderColor:"#FF4E4E",
        borderRadius: 10,
        backgroundColor: "white"
    },
    Title:{
        fontSize: 24,
        fontWeight: '900',
        marginTop: "15%",
        alignSelf: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#FF4E4E',
    },
    paginationButton: {
        backgroundColor: '#FF4E4E',
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 5,
        minWidth: 40,
        alignItems: 'center',
    },
    paginationButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    paginationButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    pageNumberButton: {
        padding: 8,
        marginHorizontal: 3,
        minWidth: 35,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    pageNumberButtonActive: {
        backgroundColor: '#FF4E4E',
    },
    pageNumberText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    pageNumberTextActive: {
        color: 'white',
    }
});