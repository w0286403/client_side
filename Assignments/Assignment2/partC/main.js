(function(){
    let hand_count = 5;

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(function(data){
         fetch('https://deckofcardsapi.com/api/deck/'+data.deck_id+'/draw/?count='+hand_count)
        .then(response => response.json())
        .then(data => {
        showHands(data.cards);
        let sorted_hand = orderCards(data.cards);
        checkHand(sorted_hand);
    })
    })


    function isFlush(hand){
        let sameSuit = false;
        for (let i = 1; i < hand_count; i++) {
            if (hand[i-1][1]=== hand[i][1]){
                sameSuit = true;
            }
        }
        return sameSuit;
    }

    function isStraight(hand){
        let straight = true;
        for (let i = 1; i < hand_count; i++) {        
            if(hand[i-1][0]!== hand[i][0]-1){
                straight = false;
            }
        }
        return straight;
    }

    function countPairs(hand){
        let sameCount = 0;
        let tempNum;
        let tempCount = 0;
        for (let i = 0; i < hand_count; i++) {
            tempNum = hand[i][0];
            for (let j = 0; j < hand_count; j++) {
                if (hand[j][0]===tempNum){
                    tempCount++;
                }
            }
            if (tempCount > sameCount){
                sameCount = tempCount;
            }
            tempCount = 0;

        }
        return sameCount;
    }

    function countSuit(hand){
        //if there are only two suits then it is full out
        //if there are three suits then two pair
        let suitCount = 4;
        hand.forEach(element => {
            
        });
      }


    function checkHand(hand){
        let isFlush1 = isFlush(hand);
        let isStraight1 = isStraight(hand);
        let count = countPairs(hand);
        if (isFlush1 && isStraight1){
            //IF A - 10 same suit:: ROYAL FLUSH
            if (hand[0][0]===10){
                console.log("ROYAL FLUSH")
            }else{//IF 5 sequential same suit:: STRAIGHT FLUSH
                console.log("STRAIGHT FLUSH")
            }
        }else if(count === 4){
            console.log("FOUR OF A KIND");//IF 4 same numbers:: FOUR OF A KIND
        }else if(){
            //IF 3 same & 2 same:: FULL HOUSE
        }else if(isFlush1){
            console.log("FLUSH");//IF 5 same suit:: FLUSH
        }else if (isStraight1){
            console.log("STRAIGHT")//IF 5 sequential:: STRAIGHT
        }else if (count === 3){
            console.log("THREE OF A KIND")//IF 3 same num:: THREE OF A KIND
        }else if (){
            //IF 2 same name & 2 same num:: TWO PAIR
        }else if(count===2){
            console.log("PAIR");//IF 2 same:: PAIR
        }else{
            console.log("HIGH CARD: " + hand[hand_count][hand_count])//Find highest card::HIGH CARD
        }
    }


    function showHands(hand){
        var outputHtml = "<table>";
        outputHtml += "<tr>"
        hand.forEach(element => {
            outputHtml += "<th>" + element.value + " of " + element.suit 
            outputHtml += "</th>"
        });
        outputHtml += "</tr>"
        outputHtml += "<tr>"
        hand.forEach(element => {
            outputHtml += "<td><img src=\"" + element.image + "\"";
            outputHtml += "</td>"
        });
        outputHtml += "</tr>"
        outputHtml += "</table>";
        document.write(outputHtml)
    }

    function orderCards(hand){

        let sorted_hand = []

        for (let i = 0; i < hand_count; i++) {
            let value;
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
                    value = 14;
                    break;
                default:
                    value = parseInt(hand[i].value);
                    break;
            }  
            sorted_hand.push([value,hand[i].suit]);
        }

        sorted_hand.sort(function(a,b){//https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        })

        return sorted_hand;
    }
})()