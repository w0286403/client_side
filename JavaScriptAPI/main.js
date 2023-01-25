(function(){
//multi-thread or A-synchronous programming
/*    document.write("first")

    setTimeout(function(){
        document.write("third");//seperate thread of execution
    },2000);

    setInterval(function(){
        document.write("third");//same thread of execution as timeout
    },2000);

    document.write("second")

    var myFunc = function(){return "hello"};
    var myFunc = () => "hello";*/

    //FETCH API
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json)
    .then(function(data){
        var outputHtml = "<ul>"
        
        data.forEach(function(element){
            outputHtml += 
            "<li>" + element.id + "-" + element.title +
            "</li>"
        })
        outputHtml += "</ul>"
        document.querySelector("#myData").innerHTML = outputHtml;

    });



})();