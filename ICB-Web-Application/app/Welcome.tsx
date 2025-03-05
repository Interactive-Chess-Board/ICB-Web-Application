import { SafeAreaView, View } from "react-native";
import { Text, StyleSheet, Pressable, Image } from "react-native";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Suspense, useEffect, useRef, useState } from "react";
import { Asset } from "expo-asset";
import * as THREE from "three";
import ChessPiece3D from "../assets/Others/chess_piece_3D.glb";
import ChessPiece3DShadow from "../assets/Others/chess_piece_3D_Shadow.glb";
import ICBLogo from "../assets/images/main/ICB_Logo.png";
import { set } from "firebase/database";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
  } from 'react-native-reanimated';

const dimensions = Dimensions.get("window");
const Height = dimensions.height;
const Width = dimensions.width;

export default function Welcome() {
    //It's not necessary since I don't use it but I will keep it for future reference
    const [gltf, setGltf] = useState<any>(null);
    const OtherRef = useRef<any>(null);
    const [positionPiece, setPositionPiece] = useState([0, 0, 0]);
    const [isStartPressed, setIsStartPressed] = useState(false);
    const getAsset = async () => {
        const assetObject = Asset.fromModule(require("../assets/Others/chess_piece_3D.glb"));
        const assetObjectShadow = Asset.fromModule(require("../assets/Others/chess_piece_3D_Shadow.glb"));
        await assetObject.downloadAsync();
        setGltf(assetObject.uri);
        console.log(assetObject.uri);
        return assetObject;
    };

    useEffect(() => {
        getAsset();
    }, []);


    //3D File Model
    //start
    function Model() {
        if (!gltf) return null;
        const ref = useRef<any>(null);
        const gltfData = useGLTF(ChessPiece3D);
        var startAnimation = true;
        const scene = gltfData.scene;
    
        // Attach ref to scene
        useEffect(() => {
            if (scene) {
                ref.current = scene;
            }
        }, [scene]);
    
        // 3D Animation
        useFrame((_, delta) => {
            setPositionPiece(ref.current.position);
            if (ref.current) {
                ref.current.rotation.y += delta * 0.5;
                if (startAnimation && !isStartPressed) {
                    ref.current.position.y = 3;
                    startAnimation = false;
                }

                // Animation goes from up to down
                if (ref.current.position.y > 1 && !isStartPressed) {
                    ref.current.position.y -= delta * 2;
                }

                // Animation goes from down to up
                if (ref.current.position.y < 1.5 && isStartPressed) {
                    ref.current.position.y += delta * 2;
                }
            }
        });
    
        const toonMaterial = new THREE.MeshToonMaterial({
            color: new THREE.Color("red"),
            gradientMap: null,
        });
    
        scene.traverse((child: any) => {
            if (child.isMesh) {
                child.material = toonMaterial;
            }
        });
    
        return(
                <primitive object={scene} scale={0.2} ref={ref} />
        );
        }
//end
       


        


        //2D Animation
        const OtherContainerAnimation = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: withTiming(isStartPressed ? Height*0.3 : Height, {
                            duration: 500,
                            easing: Easing.inOut(Easing.ease),
                        }),
                    },
                ],
            };
        });

        const LogoAnimation = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: withTiming(isStartPressed ? -Height*0.1 : 0, {
                            duration: 400,
                            easing: Easing.inOut(Easing.ease),
                        }),
                    },
                ],
                width: withTiming(isStartPressed ? Width : "90%", {
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                }),
            };
        }
        );


    return (
        <View>
        <Pressable style={styles.safeArea} >
            
            {/* Logo Image */}
            <Animated.View style = {[styles.LogoContainer, LogoAnimation]}>
                <Image source={ICBLogo} style={{width: "100%", height: "100%", resizeMode: "contain"}}/>
            </Animated.View>
            <Canvas style={styles.CanvaContainer}>
                <Suspense>
                    <OrbitControls />

                    <pointLight intensity={100} position={[1, 0, 5]} />

                    <mesh position={[1, 2, 1]} rotation={[19.8, 0, 0]}>
                        <Model />
                    </mesh>

                </Suspense>
            </Canvas>

            <Animated.View style={[styles.otherContainer, OtherContainerAnimation]}>
                <Text style={styles.Title}>Interactive Chess</Text>
                <Text style={styles.SubTitle}>
                    An immersive, interactive chess board bringing classic game to life with real-time strategy and dynamic features for all skill levels.
                </Text>

                <View style={styles.ButtonsContainer}>
                    <Pressable style={styles.LoginButton} onPress={() => router.push("/Login_Page")}>
                        <Text style={styles.LoginText}>Login</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push("/SignUpPage")} style={styles.RegisterButton}>
                        <Text style={styles.RegisterText}>Register</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push("/HomePage")} style={styles.GuestButton}>
                        <Text style={styles.GuestText}>Play as guest</Text>
                    </Pressable>
                </View>
            </Animated.View>

            {
                !isStartPressed ?
                <Pressable
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                    onPress={() => setIsStartPressed(true)}
                />: null
        }
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 0,
        justifyContent: "center",
        height: "auto",
        zIndex: 2,
    },
    CanvaContainer: {
        flex: 0,
        width: Width,
        height: Height,
        justifyContent: "center",
    },
    otherContainer: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        height: 500,
    },
    ButtonsContainer: {
        marginHorizontal: 30,
        marginTop: 20,
    },
    Title: {
        fontSize: 25,
        fontWeight: "800",
        color: "#000000",
        textAlign: "center",
        marginTop: 20,
    },
    SubTitle: {
        fontWeight: "100",
        textAlign: "center",
        marginHorizontal: "10%",
        marginTop: 5,
    },
    LoginText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    RegisterText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    GuestText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
    },
    LoginButton: {
        display: "flex",
        justifyContent: "center",
        marginVertical: 0,
        backgroundColor: "black",
        width: "100%",
        height: 60,
        borderRadius: 10,
        alignItems: "center",
        textAlign: "center",
    },
    RegisterButton: {
        display: "flex",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: "white",
        width: "100%",
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
    },
    GuestButton: {
        display: "flex",
        justifyContent: "center",
        marginVertical: 0,
        backgroundColor: "#FF4E4E",
        width: "100%",
        height: 60,
        borderRadius: 10,
    },
    LogoContainer:{
        backgroundColor: "#FFFFFF",
        width: "90%",
        height: 120,
        marginTop: Height*0.165,
        alignSelf: "center",
        borderRadius: 10,
    }
});