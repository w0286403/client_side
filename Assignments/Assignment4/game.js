(function(){

    const loadApi = async () =>{
        return fetch("https://prog2700.onrender.com/threeinarow/sample")
        .then((response)=> response.json())
        .then((data)=>data.rows)
    } 

    const createTable = (data) => {
        const target = $("#theGame")
        const table = document.createElement("table")
        console.log(target)
        data.forEach((rows) => {
            const row = document.createElement("tr")
            for (let i = 0; i < rows.length; i++) {
                const col = document.createElement("td")
                if (rows[i].currentState === 0){
                    col.classList.add("stateZero")
                }else if(rows[i].currentState === 1){
                    col.classList.add("stateOne")
                }else {
                    col.classList.add("stateTwo")
                }
                col.addEventListener("click",onClick)
                row.appendChild(col)
            }
            table.appendChild(row)
        });
        target.append(table)
    }

    const fillTable = (data) => {

    }
    const onClick = () => {
        console.log("CLICK")
    }

    const run = async ()=>{
        let data = await loadApi();
        console.log(data);
        createTable(data);
    }

    run()

})()