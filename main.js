/*
    Fix the mouse selection
*/

let rowsN = 75;
let colN = 140;
let offset = 30;

let table = document.createElement("table");
document.getElementById("GameOfLife").insertBefore(table,document.getElementById("Buttons"));
for(let i=0;i<rowsN+offset;i++){
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for(let j=0;j<colN+offset;j++){
        let cell = document.createElement("td");
        tr.appendChild(cell);
        if(i<offset/2 || i>=rowsN+offset/2 || j<offset/2 || j>=colN+offset/2)
            cell.style.display="none"
        cell.addEventListener("mousemove",toggle);
        cell.addEventListener("mouseout",function(){
            if(flag)flagDot=true;
        });
        cell.addEventListener("click",event=>{
            if((event.target).className == "alive")(event.target).className =  "dead";
            else (event.target).className = "alive"
        });
        cell.className = "dead";
        cell.id = i+"-"+j;
    }
}

function toggle(event){
    if(!flag || !flagDot)return;
    if((event.target).className == "alive")flagDot=flagDot;
    else (event.target).className = "alive"
    flagDot=false;
}

function verifyState(i,j){
    if(i<0 || i>=rowsN+offset || j<0 || j>=colN+offset || document.getElementById(i+"-"+j).className=="dead")return false;
    return true;
}

function resetBoard(){
    for(let i=0;i<rowsN+offset;i++){
        for(let j=0;j<colN+offset;j++){
           document.getElementById(i+"-"+j).className="dead";
        }
    }
}

function frame(){
    change = [];
    for(let i=0;i<rowsN+offset;i++){
        for(let j=0;j<colN+offset;j++){
            let alive=0;
            if(verifyState(i+1,j))alive++;
            if(verifyState(i-1,j))alive++;
            if(verifyState(i,j+1))alive++;
            if(verifyState(i,j-1))alive++;
            if(verifyState(i+1,j+1))alive++;
            if(verifyState(i+1,j-1))alive++;
            if(verifyState(i-1,j+1))alive++;
            if(verifyState(i-1,j-1))alive++;
            if(document.getElementById(i+"-"+j).className == "dead" && alive==3)change.push((i+"-"+j));
            else if(document.getElementById(i+"-"+j).className == "alive" && alive!=2 && alive!=3)change.push((i+"-"+j));
        }
    }
    for(let i=0;i<change.length;i++){
        //console.log(change[i]);
        if(document.getElementById(change[i]).className=="alive")document.getElementById(change[i]).className="dead";
        else document.getElementById(change[i]).className="alive";
    }
    returnVal = window.requestAnimationFrame(frame);
}

let returnVal=null;
let flag=false;
let flagDot = true;
let a = null;

// document.addEventListener("keydown",event=>{
//     if(event.keyCode==32){
//         a = new keygen(rowsN,colN,offset);
//         console.log("Key Gen");
//     }
//     else{
//         console.log("Building");
//         a.patternBuilder(rowsN,colN,offset);
//     }
// });

document.addEventListener("mousedown",function(){
    flag=true;
});
document.addEventListener("mouseup",function(){
    flag=false;
});
document.getElementById("Begin").addEventListener("click",function(){
    returnVal = returnVal = window.requestAnimationFrame(frame);
    document.getElementById("Begin").textContent="Resume";
});
document.getElementById("Pause").addEventListener("click",function(){
    window.cancelAnimationFrame(returnVal);
});
document.getElementById("Reset").addEventListener("click",function(){
    window.cancelAnimationFrame(returnVal);
    resetBoard();
    document.getElementById("Begin").textContent="Begin";
});
document.getElementById("Saver").addEventListener("click",function(){
    a = new keygen(rowsN,colN,offset);
    window.alert("Pattern saved");
})
document.getElementById("Loader").addEventListener("click",function(){
    a.patternBuilder(rowsN,colN,offset);
})