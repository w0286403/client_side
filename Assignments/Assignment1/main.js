(function(){

    function question1(word){
        //compare first & last letters
        if (word.toUpperCase().charAt(0) === word.toUpperCase().charAt(word.length-1)){
            //Same letter
            word = word.split("").reverse().join("");//reverse word
        }else{
            //Different letter
            word = word.substring(0,0) + word.substring(1,word.length)//remove first letter
            word = word.substring(0,0) + word.substring(0,word.length-1)//remove last letter
        }  
        return word;    
    } 

    function question2(arr){
        let tempSum = 0;
        let finalSum = 0;
        let streak = 1;
        let highStreak = 0;
        
        //loop through each element in array
        for (let i = 0; i < arr.length; i++) {   
            tempSum += arr[i];
            if (arr[i]+1===arr[i+1]){//if the next element is 1 more than current, increment streak
                streak++;            
            }else{//streak is over
                if (streak > highStreak){//if the streak has broken the previous streak record
                    //assign current streak & sum to highest value variables
                    highStreak = streak;
                    finalSum = tempSum;
                }else if(streak === highStreak && tempSum > finalSum){
                    //if the streak is the same, check if sum is greater than the current sum record
                    finalSum = tempSum;// assign the new sum 
                }
                //reset the streak & sum
                streak = 1;
                tempSum = 0;
            }
        }
        return finalSum
    } 

    function question3(){
        let myNextBirthday = new Date("September 11, 2023 00:00:00");
        let now = new Date();//empty date gives current time

        //source: https://stackoverflow.com/questions/36098913/convert-seconds-to-days-hours-minutes-and-seconds
        //get total seconds from the difference between dates
        //calculate time based on seconds
        let totalSeconds = parseInt((myNextBirthday - now) / (1000));
        let weeks = Math.floor(totalSeconds / (3600*24*7))
        let days = Math.floor(totalSeconds / (3600*24)) % 7;
        let hours = Math.floor(totalSeconds % (3600*24) / 3600);
        let minutes = Math.floor(totalSeconds % 3600 / 60);
        let seconds = Math.floor(totalSeconds % 60);  

        return `There are ${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds until my next birthday!`;
    }
    
    function question4(arr){
        let output = "";
        let isPrime = true;
        //Loop through every element in array
        for (let i = 0; i< arr.length; i++) {
            output+=arr[i];
            if (arr[i]===1){//check for 1
                isPrime = false;
            }else{
                //loop through numbers until reaching the value
                for (let j = 2; j < arr[i]; j++) {
                    if (arr[i]%j===0){//check if modulus of num = 0
                        isPrime = false
                        break;
                    }        
                }
            }
            isPrime ? output+= "-yes, " : output+="-no, ";
            isPrime = true;
        }
        return output;
    }

  //Q1 TEST
    let word = "Triscuit"
    let word2 = "pevvveesdep"
    console.log(question1(word2));

  //Q2 TEST
      //let arr = [100, 101, 102, 3, 4, 5, 6, 9];
      //let arr = [1, 2, 3, 6, 9, 34, 2, 6];
      let arr = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3]
      console.log(question2(arr));

  //Q3 TEST
    console.log(question3());

  //Q4 TEST
    //random source: https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
    var randomPrimeArray = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
    //var primeArray = [23,15,22,124,11,9,2,13,5,1];
    console.log(question4(randomPrimeArray));
})();