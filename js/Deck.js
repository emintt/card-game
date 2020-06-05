class Deck{

    constructor(){

        // Muuttujat
       
        this.deckCards = [0,1,2,3,4,5,6,7,8,9,10,
            11,12,13,14,15,16,17,18,19,
            20,21,22,23,24,25,26,27,28,29,
            30,31,32,33,34,35,36,37,38,39,
            40,41,42,43,44,45,46,47,48,49,50,51]; 
       
       //this.deckCards = [0,1,2,3,4,5,6,7,8,9,10];
        //this.deckCards = [3,4,18,32,33,47,13,25];
        //this.deckCards = [3,16,29,42,45,32];
        this.takenCards = [];
        console.log("Pakka on luotu");


    }

    Deal(amount, player){

        console.log("Jaetaan " + amount + 
        " korttia pelaajalle: " + player.name);

        /*
        Mitä jakamisessa tapahtuu?
        - Ota deckCards taulukosta satunnaisesti 
        kortteja amount arvon verran pelaajalle
        - Tarkasta onko jo otettu kortti takenCards taulukossa
        - Jos kortti on jo otettu, ota uusi satunnainen kortti
        - Jos ei, laita kortti player objektin hand[] 
        taulukkomuuttujaan
        - Tällöin lisää vedetty kortti takenCard taulukkoon
        - Kerro konsolissa minkä kortin pelaaja sai
        */

        let i = 0;
        while(i<amount){
            // satunnainen luku deckCards taulukosta
            let cardValue = this.deckCards[Math.floor
                (this.deckCards.length * Math.random())];
            
            if(this.takenCards.includes(cardValue)){

                console.log("Kortti" + cardValue + 
                " oli jo vedetty. Arvo kortti uudestaan");

            }else{

                console.log("Kortti jonka saat käteesi on:" + cardValue);
                player.hand[i] = cardValue;
                this.takenCards.push(cardValue);
                i++;

            }

        } // while päättyy, eli kortit on jaettu. 
        // Pelaaja näyttää mitkä kortit ovat kädessä
        player.ShowHand();
        



    } // Deal päättyy tähän

    GetCard(){
        // GetCard palauttaa satunnaisen luvun deckCardin arvoista
        let card = this.deckCards[Math.floor(this.deckCards.length *
             Math.random())];
        return card; 

        // this.deckCard[]
        // Math.floor() Ottaa desimaalit pois
        // this.deckCards.lenght 52
        // Math.random() 0-1 esim. 0.264578 tai 0.89236 tai 0,56219



    }
}