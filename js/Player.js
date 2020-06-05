class Player{

    constructor(name, numOfCards, gameDeck, money, bet){

        this.name = name;
        this.numOfCards = numOfCards;
        this.gameDeck = gameDeck;
        this.hand = [];
        this.money = money;
        this.bet = bet;
        console.log("Pelaaja on luotu: " + this.name);


    }

    ShowHand(){
        // Käydään käden hand[] muuttujan kaikki arvot läpi
        for(let i = 0; i<this.hand.length; i++){
            
            console.log("Kortti kädessä: " + i + " on: " + this.hand[i]);
            console.log("Kortti on: " + this.ConvertCardToText(this.hand[i]));
            
            document.getElementById("card"+i).innerHTML = 
            "<img src=\"./images/"+this.hand[i]+".png\">";

        }

    }

    ConvertCardToText(card){

        let suit;
        let number; 

        if(card <= 12){
            suit = "Pata";
            number = card +1;
        }else if(card <= 25){
            suit ="Ruutu";
            number = card - 12;
        }else if(card <= 38){
            suit = "Risti";
            number = card - 25;
        }else {
            suit = "Hertta";
            number = card - 38;
        }

        return suit + " " + number; 

    } // ConvertCardToText päättyy tähän

    ChangeCards(cards){

        console.log("Vaihdettavat kortit ovat: " + cards);

        let nums = cards.split(',');

        let i = 0;
        while(i<nums.length){

            // Vedetään yksi kortti pakasta kerrallaan
            let cardValue = deck.GetCard();
            console.log("Kortti, joka vedettiin on: " + cardValue +
             " Tekstinä: " + this.ConvertCardToText(cardValue));

             if(deck.takenCards.includes(cardValue) == false){
                // Korttia ei ole vedetty
                console.log("Kortti käteen");
                this.hand[nums[i]] = cardValue;
                deck.takenCards.push(cardValue);
                i++;
             }else{

                console.log("Kortti oli jo vedetty pakasta");

             }
        }
        this.ShowHand();
        this.CheckResults();
    }

    CheckResults(){

        console.log("TARKASTETAAN TULOKSET!");

        let resultDone = false;

        let winnings;


        // Järjestetään kädessä olevat kortit numerojärjestykseen
        this.hand.sort(function(a,b){return a-b});
        // Näytetään käsi numerojärjestyksessä
        //this.ShowHand();



        //  ********** Tarkastetaan onko pelaajalla VÄRI ************

        if(resultDone == false && 
            this.GetSuit(this.hand[0]) == this.GetSuit(this.hand[1]) && 
            this.GetSuit(this.hand[1]) == this.GetSuit(this.hand[2]) && 
            this.GetSuit(this.hand[2]) == this.GetSuit(this.hand[3]) && 
            this.GetSuit(this.hand[3]) == this.GetSuit(this.hand[4])){

            console.log("SINULLA ON VÄRI!!!");
            document.getElementById("results").innerHTML = "Sinulla on väri!";
            winnings = this.bet * 6;
            resultDone = true; 

        }


        // *********** Tarkastetaan onko pelaajalla SUORA *************

        let straightHand = [];
        
        for(let i = 0; i<this.hand.length; i++){

            straightHand.push(this.GetNumber(this.hand[i]));
        }
        straightHand.sort(function(a,b){return a-b});



        if(resultDone == false && 
            straightHand[0] - straightHand[1] == -1 &&
            straightHand[1] - straightHand[2] == -1 &&
            straightHand[2] - straightHand[3] == -1 &&
            straightHand[3] - straightHand[4] == -1){

            console.log("SINULLA ON SUORA!!!");
            document.getElementById("results").innerHTML = "Sinulla on suora!";
            winnings = this.bet * 4;
            resultDone = true; 

        }

        //Tarkastetaan neloset, täykäsi, kolmoset, ja pari 
        var pairHand = [];
        for (var i = 0; i < this.hand.length; i++) {
            pairHand.push(this.GetNumber(this.hand[i]));
        }
        console.log(pairHand);
        var duplicates = this.FindDuplicateInHand(pairHand);
        // esim duplicate = [2, 4] tai [5,8] tai [3]..

        // Tarkastetaan paljonko duplicaatteja on
        let count = 0;  //montako on ensimmäistä lukua esim. 2:a
        let count2 = 0;  //montako on toista lukua esim. 4:sta

        for (var i = 0; i < pairHand.length; i++) {
            if (duplicates[0] == pairHand[i] && duplicates.length > 0) {              
                count++
            }
            if (duplicates[1] == pairHand[i] && duplicates.length > 0) {     
                count2++
            }

        }
        console.log(count + " " + count2);

        if (resultDone == false) {
            if (count == 4) {
                console.log("Neljä samaa");
                document.getElementById("results").innerHTML = "Neljä samaa";
                winnings = this.bet * 20;
            } else if (count >= 2 && count2 >= 2) {
                if (count == 3 || count2 == 3) {
                    console.log("Täyskäsi");
                    document.getElementById("results").innerHTML = "Täyskäsi";
                    winnings = this.bet * 9;
                } else {
                    console.log("Kaksi paria");
                    document.getElementById("results").innerHTML = "Kaksi paria";
                    winnings = this.bet * 3;
                }
            } else if (count == 3 || count2 == 3) {
                console.log("Kolme samaa");
                document.getElementById("results").innerHTML = "Kolme samaa";
                winnings = this.bet * 4;
            } else if (count == 2 || count2 == 2) {
                console.log("Pari");
                document.getElementById("results").innerHTML = "Pari! ";
                winnings = this.bet * 1;
                
            } else {
                console.log("Ei ole mitään. Ei voittoa!");
                document.getElementById("results").innerHTML = "Ei ole mitään. Ei voittoa!";
                winnings = 0;
                
            }
        }
        document.getElementById("win").innerHTML = winnings;
        let currentMoney = this.money;
        this.money += winnings;
        let newMoney = Number(currentMoney + winnings);

        // Interval, ajetaan funktio tietyn ajan välein, jotta numero kasvaa
        var interval = setInterval(function() {
            document.getElementById("money").innerHTML = currentMoney;
            if (currentMoney >= newMoney) {
                this.money = currentMoney;
                clearInterval(interval);
            }
            currentMoney++;
        }, 100);

     
        
    }

    GetSuit(card){

        // Kirjoita koodi, joka osaa katsoa kortin numeron ja paluttaa maan
        // Kopioi ConvertCardToText funktiota 10min
        let suit;
        
        if(card <= 12){
            suit = "Pata";         
        }else if(card <= 25){
            suit ="Ruutu";        
        }else if(card <= 38){
            suit = "Risti";         
        }else {
            suit = "Hertta";
        }
        return suit;
    }

    GetNumber(card){
        // Koodi joka palauttaa kortin numeron. Kopioi ConvertCardToText
        let number; 
        if(card <= 12){    
            number = card +1;
        }else if(card <= 25){   
            number = card - 12;
        }else if(card <= 38){  
            number = card - 25;
        }else {
            number = card - 38;
        }
        return number;
    }

    FindDuplicateInHand(arra1) {
        //arra1 sisältää kädessä olevien korttien numerot
        let object = {};
        let result = [];

        arra1.forEach(function(item) {
            if (!object[item]) {
                object[item] = 0;
            }
            object[item] += 1;

        })
        console.log(object);

        for (var prop in object) {
            if (object[prop] >= 2) {    
                result.push(prop)
            }
        }
        console.log(result);
        return result;


    }

}