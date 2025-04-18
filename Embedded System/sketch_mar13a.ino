#include <FastLED.h>
#define LED_PIN     2       
#define NUM_LEDS    147     // Number of LEDs in the strip
#define COLOR_ORDER GRB     
#define CHIPSET     WS2812B 
#define BRIGHTNESS  55      // Brightness level (0 to 255)


CRGB leds[NUM_LEDS];

// Mapping of chessboard tiles
int LedsMapping[64] = {11,9,8,6,5,3,2,0,12,14,15,17,18,20,21,23,38,37,35,34,32,31,29,27,40,41,43,44,46,47,49,50,65,64,62,61,59,58,56,55,67,68,70,71,73,74,76,78,93,91,90,88,87,85,84,82,95,97,98,100,101,103,104,106};
int Mux_Mapping[64] = {55, 51, 48, 54, 50, 49, 52, 53, 
34, 32, 33, 35, 37, 36, 39, 38, 
46, 40, 41, 42, 43, 44, 45, 47, 
17, 16, 18, 19, 20, 21, 22, 23, 
31, 25, 27, 29, 28, 26, 30, 24, 
63, 61, 56, 57, 59, 62, 58, 60, 
10, 8, 11, 9, 12, 13, 14, 15, 
6, 7, 1, 0, 3, 2, 5, 4};
//int Mux_Mappin_1[7] = {59,58,61,60,63,62,56,57};
//int Mux_Mappin_2[64] = {34,12,19,27,46,9,38,55}; // Random values
//int Mux_Mappin_3[64] = {22,41,33,16,50,7,29,48}; // Random values

// Define pin assignments for mux
const int SelC = 3;
const int MUX_out = 4; // Input pin
const int SelA = 6;
const int SelB = 7;
const int SelGenA = 9;
const int SelGenB = 10;
const int SelGenC = 11;

void setup() {
    FastLED.addLeds<CHIPSET, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
    FastLED.setBrightness(BRIGHTNESS);
    FastLED.show();

    pinMode(SelC, OUTPUT);
    pinMode(SelA, OUTPUT);
    pinMode(SelB, OUTPUT);
    pinMode(SelGenA, OUTPUT);
    pinMode(SelGenB, OUTPUT);
    pinMode(SelGenC, OUTPUT);
    
    pinMode(MUX_out, INPUT);
    
    digitalWrite(SelC, LOW);
    digitalWrite(SelA, LOW);
    digitalWrite(SelB, LOW);
    digitalWrite(SelGenA, LOW);
    digitalWrite(SelGenB, LOW);
    digitalWrite(SelGenC, LOW);
    
    Serial.begin(9600);
}

void loop() {
    Serial.println("Chessboard State:");
    
    for (int row = 0; row < 8; row++) {


        digitalWrite(SelGenA, row & 0x01);
        digitalWrite(SelGenB, (row >> 1) & 0x01);
        digitalWrite(SelGenC, (row >> 2) & 0x01); // MSB
        
        delay(50);
        
        for (int col = 0; col < 8; col++) {
            digitalWrite(SelA, col & 0x01);
            digitalWrite(SelB, (col >> 1) & 0x01);
            digitalWrite(SelC, (col >> 2) & 0x01);
            
            delay(10); 
            int tileState = digitalRead(MUX_out);
            
            Serial.print(tileState);
            Serial.print(" ");
            
            CRGB color = (tileState == 0) ? CRGB(255, 0, 0) : CRGB(0, 255, 0); // Red 0
            leds[LedsMapping[Mux_Mapping[row * 8 + col]]] = color;
            //leds[LedsMapping[row * 8 + col]] = color;
        }
        Serial.println();
    }
    
    Serial.println("--------------------");
    FastLED.show(); 
    delay(50); 
}
