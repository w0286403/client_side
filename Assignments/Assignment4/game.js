(function(){
    let state0 = "stateZero"
    let state1 = "stateOne"
    let state2 = "stateTwo"
    let toggle = "canToggle"
    let cellCount = 0

    const loadApi = async () =>{
        return fetch("https://prog2700.onrender.com/threeinarow/sample")
        .then((response)=> response.json())
        .then((data)=>data.rows)
    } 

    const createTable = (data) => {
        const target = $("#theGame")
        const table = document.createElement("table")
        table.classList.add("gameTable")
        data.forEach((rows) => {
            cellCount++;
            const row = document.createElement("tr")
            for (let i = 0; i < rows.length; i++) {
                const col = document.createElement("td")
                if (rows[i].currentState === 0){
                    col.classList.add(state0)
                    col.classList.add(toggle)
                }else if(rows[i].currentState === 1){
                    col.classList.add(state1)
                }else {
                    col.classList.add(state2)
                }
                col.addEventListener("click", () => {
                    onClick(col)
                })
                row.appendChild(col)
            }
            table.appendChild(row)
        });

        target.append(table)
    }

    let createButtons = (data) => {
        let target = $("body")
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

    }

    const onChecked = (event,data) => {
        const table = document.getElementsByClassName("gameTable")[0];
        for (let i = 0; i < cellCount; i++) {
            const row = table.rows[i];
            for (let j = 0; j < cellCount; j++) {
                const cell = row.cells[j]; 
                cell.style.outline = "";
            }
        }
        if (event.target.checked){
           
                for (let i = 0; i < cellCount; i++) {
                    const row = table.rows[i];
                    for (let j = 0; j < cellCount; j++) {
                        const cell = row.cells[j];
                        if (cell.classList.contains(state0) ||
                            cell.classList.contains(state1) && data[i][j].correctState != 1 ||
                            cell.classList.contains(state2) && data[i][j].correctState != 2){
                            cell.style.outline = "2px solid red";
                        }
                    }
                }
            
        }
    }

    const isCorrect = (data) => {
        const table = document.getElementsByClassName("gameTable")[0];

        for (let i = 0; i < cellCount; i++) {
            const row = table.rows[i];
            for (let j = 0; j < cellCount; j++) {
                const cell = row.cells[j];
                if (cell.classList.contains(state0) ||
                    cell.classList.contains(state1) && data[i][j].correctState != 1 ||
                    cell.classList.contains(state2) && data[i][j].correctState != 2){
                    return false;
                }
            }
        }
    }

    const checkForThreeInRow = () => {
        const table = document.getElementsByClassName("gameTable")[0]
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

    const checkColorCount = () => {
        let colorCount = cellCount / 2;
        const table = document.getElementsByClassName("gameTable")[0]
        let rowCount1;
        let rowCount2;
        let colCount1;
        let colCount2;
        
        for (let i = 0; i < cellCount; i++) {
            rowCount1 = 0
            rowCount2 = 0
            colCount1 = 0
            colCount2 = 0
            let row = table.rows[i];
            for (let j = 0; j < cellCount; j++) {
                const cell = row.cells[j];
                const cellCol = table.rows[j].cells[i];
                if (cell && cell.classList){
                    if (cell.classList.contains(state1)){
                        rowCount1++
                    }else if (cell.classList.contains(state2)){
                        rowCount2++;
                    }
                }
                if (cellCol && cellCol.classList){
                    if (cell.classList.contains(state1)){
                        colCount1++
                    }else if (cell.classList.contains(state2)){
                        colCount2++;
                    }
                }
            }
            if (rowCount1 > colorCount || rowCount2 > colorCount ||
                colCount1 > colorCount || colCount2 > colorCount ){
                return false;
            }
        }
        return true;
    }

    const onClick = (obj) => {
        if (obj.classList.contains(toggle)){
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
    }

    let btn_click = (data) => {
        let text = ""
        if (isCorrect(data)){
            text = "You Got It!"
        }else{
            if (checkColorCount() && checkForThreeInRow()){
                text = "So Far So Good"
            }else{
                text = "Something Is Wrong..."

            }
        }

        const label = document.getElementsByClassName("btn_label")[0]
        label.textContent = text    
    }

    const run = async ()=>{
        let data = await loadApi();
        console.log(data);
        createTable(data);
        createButtons(data);
    }

    run()
})()