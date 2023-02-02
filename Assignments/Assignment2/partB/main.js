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