(function(){
    let hand_count = 5;

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(function(data){
         fetch('https://deckofcardsapi.com/api/deck/'+data.deck_id+'/draw/?count='+hand_count)
        .then(response => response.json())
        .then(data => {
        showHands(data.cards)
    })
    })

    function showHands(hand){
        hand.forEach(element => {
            var outputHtml = "<p>" + element.value + " of " + element.suit
            outputHtml += "<img src=\""
            outputHtml += element.image
            console.log(element)
            outputHtml += "\"></p>"
            document.write(outputHtml)
        });
    }

})()