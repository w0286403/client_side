(function(){
    const HAND_COUNT = 5;

    //Fetch shuffled cards
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(function(data){
        //Grab 5 cards from shuffled
        fetch('https://deckofcardsapi.com/api/deck/'+data.deck_id+'/draw/?count='+hand_count)
        .then(response => response.json())
        .then(data => {
        showHands(data.cards);//display cards
        check_hand(sorted_hand);//show hand value
        })
    })

    //function to determine value of hand
    function check_hand(hand){
        //check if hand is flush
        let isFlush = checkForFlush(hand);
        //convert face to numbers and return a sorted hand 
        let sortedHand = orderCards(hand);
        //check if hand is a straight
        let isStraight = checkForStraight(sortedHand);
        //count number of duplicate values
        let dupeCount = countDuplicateValues(sortedHand);
        //count number of pairs are in hand
        let pairCount = countPairs(sortedHand);
        
        let outputHtml = "<h1>"

        if (checkRoyalFlush(sortedHand)){
            outputHtml += "ROYAL FLUSH"
        }else if (isFlush && isStraight){
            outputHtml += "STRAIGHT FLUSH"
        }else if (dupeCount === 4){//4 equal cards
            outputHtml += "FOUR OF A KIND"
        }else if (pairCount === 2){//if theres not 4 equal and the count of pairs is 2
            outputHtml += "FULL HOUSE"
        }else if (isFlush){
            outputHtml += "FLUSH"
        }else if (isStraight){
            outputHtml += "STRAIGHT"
        }else if(dupeCount === 3){//3 equals
            outputHtml += "THREE OF A KIND"
        }else if (pairCount === 3){//if theres not 3 equal and the count is 3
            outputHtml += "TWO PAIR"
        }else if (dupeCount === 2){
            outputHtml += "PAIR"
        }else{
            outputHtml += "HIGH CARD"
        }
        outputHtml += "</h1>"
        document.write(outputHtml);//show hand type in DOM
    }

    //function to assign face vards value and return a sorted hand
    function orderCards(hand){
        let sorted_hand = []
        //Loop through each card
        for (let i = 0; i < HAND_COUNT; i++) {
            let value;
            //Switch over the value and assign numbers to the face cards
            switch(hand[i].value){
                case "JACK":
                    value = 11;
                    break;
                case "QUEEN":
                    value = 12;
                    break;
                case "KING":
                    value = 13;
                    break;
                case "ACE":
                    value = 1;
                    break;
                default://if not face, convert value int
                    value = parseInt(hand[i].value);
                    break;
            }  
            //push each value into new array
            sorted_hand.push(value);
        }
        //sort the array from lowest to highest value
        sorted_hand.sort(function(a,b){return a - b})//SOURCE: https://stackoverflow.com/questions/7000851/how-to-sort-numbers-correctly-with-array-sort

        return sorted_hand;
    }

    //Funtion to check for royal flush as ACE is coded to being value of 1
    function checkRoyalFlush(hand){
        let isRoyal = false;
        //Check that the hand contains all values of royal flush
        if (hand.includes(10) && hand.includes(11) && hand.includes(12) && hand.includes(13) && hand.includes(1)){
            isRoyal = true
        }
        return isRoyal;
    }

    //function to count number of pairs (IE will return 3 if hand is two pair, 
    //will return 2 if hand is full house)
    function countPairs(hand){
        let count = 0;
        //Loop through each card 
        for (let i = 1; i <= HAND_COUNT; i++) {
            //increment count when a card changes value
            if (hand[i-1]!==hand[i]){
                count++;
            }
        }
        return count;
    }

    //function for counting how many cards have the same value (returns the highest streak)
    function countDuplicateValues(hand){
        let sameCount = 0;
        let tempCount = 0;
        //Loop through each card in hand
        for (let i = 0; i < HAND_COUNT; i++) {
            let tempNum = hand[i];
            //loop through the rest of the cards for each card
            for (let j = 0; j < HAND_COUNT; j++) {
                //Check their value against current outer card
                if (hand[j]===tempNum){
                    tempCount++;
                }
            }
            //Check if the current count is greater than the last
            if (tempCount > sameCount){
                sameCount = tempCount;
            }
            tempCount = 0;
        }
        return sameCount;
    }

    //Check that hand is straight
    function checkForStraight(hand){
        let straight = true;
        //hand parameter will be sorted from lowest to highest
        for (let i = 1; i < HAND_COUNT; i++) {   
            //Loop each card and make sure that the next card is one higher in value     
            if(hand[i-1]!== hand[i]-1){
                straight = false;
            }
        }
        return straight;
    }

    //Check that all suits are the same 
    function checkForFlush(hand){
        let sameSuit = true;
        //Loop through each card and check that the last cards suit is the same as the current card
        for (let i = 1; i < HAND_COUNT; i++) {
            if (hand[i-1].suit!== hand[i].suit){
                sameSuit = false;
            }
        }
        return sameSuit;
    }

    //function to display cards in DOM
    function showHands(hand){
        var outputHtml = "<table>";
        outputHtml += "<tr>"
        hand.forEach(element => {//Display the name and suit in first row
            outputHtml += "<th>" + element.value + " of " + element.suit 
            outputHtml += "</th>"
        });
        outputHtml += "</tr>"
        outputHtml += "<tr>"
        hand.forEach(element => {//Display the image of card in second row
            outputHtml += "<td><img src=\"" + element.image + "\"";
            outputHtml += "</td>"
        });
        outputHtml += "</tr>"
        outputHtml += "</table>";
        document.write(outputHtml)//Write html to document
    }

})()