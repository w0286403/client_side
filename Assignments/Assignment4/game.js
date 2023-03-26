(function(){
    //Declaration of constants
    const state0 = "stateZero";
    const state1 = "stateOne";
    const state2 = "stateTwo";
    let apiData;
    let cellCount = 0;
    let timer;

    //Function to load api data to an array
    const loadApi = async () =>{
        return await fetch("https://prog2700.onrender.com/threeinarow/random")
        .then((response)=> response.json())
        .then((data)=>data.rows);
    } 

    //function to dynamically create a table based on API
    const createTable = (data) => {
        //Grab target and create a table based off of it
        const target = $("#theGame");
        const table = document.createElement("table");
        table.classList.add("gameTable");
        //Loop through each element and create cells in html
        data.forEach((rows) => {
            cellCount++;
            const row = document.createElement("tr")
            rows.forEach(element => {
                const col = document.createElement("td")
                //Assign classes that control color depending on current state
                if (element.currentState === 0){
                    //state zero are only toggle-able buttons
                    col.classList.add(state0)
                    col.addEventListener("click", () => {
                        cellOnClick(col)
                    });
                }else if(element.currentState === 1){
                    col.classList.add(state1)
                }else {
                    col.classList.add(state2)
                }

                row.appendChild(col)
            });
            table.appendChild(row)
        });

        target.append(table)
    };

    //functionn to create remaining html elements
    const createButtons = (data) => {
        let target = $("body")

        //Create button for checking the status of puzzle
        const btn = document.createElement("button")
        btn.classList.add("btn")
        btn.textContent = "Check Puzzle"
        btn.addEventListener("click",() => {
            btn_click(data);
        })
        target.append(btn)
        const btn_label = document.createElement("label")
        btn_label.classList.add("btn")
        btn_label.classList.add("btn_label")
        target.append(btn_label)

        //Create check box to display errors
        const check = document.createElement("input")
        check.classList.add("btn")
        check.setAttribute("type","checkbox")
        check.addEventListener("change",(event) => {
            onChecked(event,data)
        })
        target.append(check)
        const label = document.createElement("label")
        label.classList.add("btn")
        label.textContent = "Check Errors"
        target.append(label)

        //Create timer
        const timer = document.createElement("h1")
        timer.classList.add("timer")
        target.append(timer);

    }

    //Function to check if puzzle is correct
    const isCorrect = (data) => {
        const table = document.getElementsByClassName("gameTable")[0];

        //Loop through each cell
        for (let i = 0; i < cellCount; i++) {
            const row = table.rows[i];
            for (let j = 0; j < cellCount; j++) {
                const cell = row.cells[j];
                //check that the cell's current state is equal to the APIs correct solution
                if (cell.classList.contains(state0) ||
                    cell.classList.contains(state1) && data[i][j].correctState != 1 ||
                    cell.classList.contains(state2) && data[i][j].correctState != 2){
                    return false;
                }
            }
        }
        return true;
    }

    //Function to check if there are currently three states in a row
    const checkForThreeInRow = () => {
        const table = document.getElementsByClassName("gameTable")[0]
        //Loop through each cell in row and check if there are three same states in a row
        for (let i = 0; i < cellCount; i++) {
            let row = table.rows[i];
            for (let j = 0; j < cellCount - 2; j++) {
                const cell1 = row.cells[j];
                const cell2 = row.cells[j+1];
                const cell3 = row.cells[j+2];
                if (cell1.classList.contains(state1) && cell2.classList.contains(state1) && cell3.classList.contains(state1) ||
                    cell1.classList.contains(state2) && cell2.classList.contains(state2) && cell3.classList.contains(state2)){
                        return false;
                    }
            }
        }
        //Loop through each cell in column and check if there are three same states in a row
        for (let i = 0; i < cellCount; i++) {
            for (let j = 0; j < cellCount - 2; j++) {
                const cell1 = table.rows[j].cells[i];
                const cell2 = table.rows[j+1].cells[i];
                const cell3 = table.rows[j+2].cells[i];
                if (cell1.classList.contains(state1) && cell2.classList.contains(state1) && cell3.classList.contains(state1) ||
                cell1.classList.contains(state2) && cell2.classList.contains(state2) && cell3.classList.contains(state2)){
                    return false;
                    
                }
            }
        }
        return true
    }

    //Function to check that there are the correct number of states in a row & column
    const checkColorCount = () => {
        //Determine the count based on the size of the table
        let colorCount = cellCount / 2;
        const table = document.getElementsByClassName("gameTable")[0]
        let rowCount1;
        let rowCount2;
        let colCount1;
        let colCount2;
        
        //Loop through each cell
        for (let i = 0; i < cellCount; i++) {
            rowCount1 = 0
            rowCount2 = 0
            colCount1 = 0
            colCount2 = 0
            let row = table.rows[i];
            for (let j = 0; j < cellCount; j++) {
                //Grab each cell and compare them in rows and columns
                const cell = row.cells[j];
                const cellCol = table.rows[j].cells[i];
                //increment num of states in row and column accordingly
                if (cell && cell.classList){
                    if (cell.classList.contains(state1)){
                        rowCount1++
                    }else if (cell.classList.contains(state2)){
                        rowCount2++;
                    }
                    if (cellCol.classList.contains(state1)){
                        colCount1++
                    }else if (cellCol.classList.contains(state2)){
                        colCount2++;
                    }
                }
            }
            //Check that the counts are less than the allowed in table
            if (rowCount1 > colorCount || rowCount2 > colorCount ||
                colCount1 > colorCount || colCount2 > colorCount ){
                return false;
            }
        }
        return true;
    }

    //On click to change cell color
    const cellOnClick = (obj) => {
       //Check cells current state, and increment its state
        if (obj.classList.contains(state0)){
            obj.classList.remove(state0)
            obj.classList.add(state1);
        }else if (obj.classList.contains(state1)){
            obj.classList.remove(state1)
            obj.classList.add(state2)
        }else{
            obj.classList.remove(state2)
            obj.classList.add(state0)
        }  
    }

    //On click to determine if the puzzle is complete
    const btn_click = (data) => {
        let text = ""
        //Check if the puzzle is correct
        if (isCorrect(data)){
            text = "You Got It!"
            clearInterval(timer);//Stop timer
        }else{
            //Check if the count per row / col & three in a row are both valid
            if (checkColorCount() && checkForThreeInRow()){
                text = "So Far So Good"
            }else{
                text = "Something Is Wrong..."

            }
        }
        //print status
        const label = document.getElementsByClassName("btn_label")[0]
        label.textContent = text    
    }

    //On click to outline incorrect cells
    const onChecked = (event,data) => {
        const table = document.getElementsByClassName("gameTable")[0];
        //reset every cell outline to black
        for (let i = 0; i < cellCount; i++) {
            const row = table.rows[i];
            for (let j = 0; j < cellCount; j++) {
                const cell = row.cells[j]; 
                cell.style.outline = "";
            }
        }
        //Check that the checkbox is checked
        if (event.target.checked){
            //Loop through each cell
            for (let i = 0; i < cellCount; i++) {
                const row = table.rows[i];
                for (let j = 0; j < cellCount; j++) {
                    const cell = row.cells[j];
                    //determine if the state is correct and add the error style accordingly
                    if (cell.classList.contains(state0) ||
                        cell.classList.contains(state1) && data[i][j].correctState != 1 ||
                        cell.classList.contains(state2) && data[i][j].correctState != 2){
                        cell.style.outline = "2px solid red";
                    }
                }
            }
            
        }
    }

    //Function to create timer 
    const startTime = () =>{
        const label = document.getElementsByClassName("timer")[0]
        let minutes = 5;
        let seconds = 0;
        label.textContent = "0" + minutes + ":0" + seconds;
        //run function every second 
        timer = setInterval(() => {
            //decremint seconds every interval and change display min and seconds accordingly
            seconds--;
            if (seconds === -1){
                minutes--;
                seconds = 59;
            }
            //If seconds is less than 10 append 0 
            if (seconds < 10){
                label.textContent = "0" + minutes + ":0" + seconds;

            }else{
                label.textContent = "0" + minutes + ":" + seconds;

            }
            //If timer hits 0 call the fail function
            if (minutes <= 0 && seconds <= 0){
                failed();
                clearInterval(timer);
            }
        }, 1000);   
    }
    
    //Function to restart puzzle if timer runs out
    const failed = () => {
        //clear the html and add button to retry
        let target = $("body")
        target.empty()
        const btn = document.createElement("button")
        btn.classList.add("btn")
        btn.textContent = "Try Again?"
        btn.addEventListener("click",()=>{
            target.empty()
            location.reload()//reload page
        })
        target.append(btn)
    }

    //function to run the game
    const run = async () => {
        apiData = await loadApi();
        createTable(apiData);
        createButtons(apiData);
        startTime();
    }

    run()
})()