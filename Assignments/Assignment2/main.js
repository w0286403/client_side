(function(){
    
    fetch('https://api.magicthegathering.io/v1/cards')
    .then(response => response.json())
    .then(data => {
        let outputHtml = "<ul>"

        for (let i = 0; i < 3; i++) {
            outputHtml += "<li>"
            outputHtml += JSON.stringify(data.cards[i])
            outputHtml += "</li>"
            
        }
        outputHtml += "</ul>"
        document.write(outputHtml)
        
    });
    
})()

    



//      fetch('https://api.magicthegathering.io/v1/cards')
    //   .then(response => response.json())
    //   .then(function(data){
    //        var outputHtml = "<ul>";
    //        for (let i = 0; i < data.cards.length; i++) {
    //           outputHtml += "<li>NAME: " + data.cards[i].name + " ARTIST: " + data.cards[i].artist; 
    //          //console.log(data.cards[i].foreignNames)
    //           data.cards[i].foreignNames.forEach(function(element){
    //                   outputHtml += "<li>" + element.language + "</li>"
    //               });
    //           outputHtml += "</li>"      
                     
    //        }
    //        outputHtml += "</ul>"
    //        document.write(outputHtml);
    //    })


