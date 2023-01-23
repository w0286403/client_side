(function(){

var myFunc = function(){
    console.log("blah")
}

//setInterval(myFunc,1000);

var x = {
    name : "zack",
    "age" : 11,
    "isSomething" : true,
    "nestedObject" : {
        "a" : "A",
        "b" : "B"
    },
    "sayHi" : function(){
        console.log("hi")
    }
}

x.isCool = true;
x.newFunc = function(){console.log("newFunc")}

x.sayHi();
x.newFunc();

var y = new Object();


})();