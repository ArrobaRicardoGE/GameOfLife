/*
    When one popup appears, close the other one
    If I pause it resets the localSave
*/

let rowsN = 75;
let colN = 140;
let offset = 30;
let returnVal=null;
let flag=false;
let flagDot = true;
let keySaver = null;
let localSave = new KeyGenV2("O2903");

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
    if((event.target).className == "alive")gitflagDot=flagDot;
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
document.addEventListener("mousedown",function(){
    flag=true;
});
document.addEventListener("mouseup",function(){
    flag=false;
});
document.getElementById("Begin").addEventListener("click",function(){
    returnVal = returnVal = window.requestAnimationFrame(frame);
    document.getElementById("Begin").textContent="Resume";
    localSave = new KeyGenV2(rowsN,colN,offset);
});
document.getElementById("Pause").addEventListener("click",function(){
    window.cancelAnimationFrame(returnVal);
});
document.getElementById("Clear").addEventListener("click",function(){
    window.cancelAnimationFrame(returnVal);
    resetBoard();
    document.getElementById("Begin").textContent="Begin";
    localSave = new KeyGenV2("O2903");
});
document.getElementById("Reset").addEventListener("click",function(){
    window.cancelAnimationFrame(returnVal);
    localSave.buildPattern(rowsN,colN,offset);
    document.getElementById("Begin").textContent="Begin";
});
document.getElementById("Save").addEventListener("click",function(){
    keySaver = new KeyGenV2(rowsN,colN,offset);
    document.getElementById("keyDisplay").value=keySaver.key;
    document.getElementById("LoadKey").style="display:none;";
    document.getElementById("GeneratedKey").style="display:block;";
});
document.getElementById("Load").addEventListener("click",function(){
    document.getElementById("GeneratedKey").style="display:none;";
    document.getElementById("LoadKey").style="display:block;";
});
document.getElementById("Submit").addEventListener("click",function(){
    let keyLoad = new KeyGenV2(document.getElementById("keySubmit").value);
    keyLoad.buildPattern(rowsN,colN,offset);
    document.getElementById("LoadKey").style="display:none;";
});
document.getElementById("Copy").addEventListener("click",function(){
    document.getElementById("keyDisplay").select();
    document.execCommand("copy");
    document.getElementById("GeneratedKey").style="display:none;";
});
let showGrid=true;
document.getElementById("Grid").addEventListener("click",function(){
    if(showGrid){
        document.documentElement.style.setProperty("--gridColor","black");
        document.documentElement.style.setProperty("--gridWeight","0px");
        showGrid=false;
    }
    else{
        document.documentElement.style.setProperty("--gridColor","grey");
        document.documentElement.style.setProperty("--gridWeight","1px");
        showGrid=true;
    }
});
document.getElementById("what").addEventListener("click",changePage);
document.getElementById("conway").addEventListener("click",changePage);
document.getElementById("main").addEventListener("click",changePage);
document.getElementById("support").addEventListener("click",changePage);
document.getElementById("contact").addEventListener("click",changePage);

function changePage(e){
    document.getElementById("whatDisplay").style="display:none;";
    document.getElementById("conwayDisplay").style="display:none;";
    document.getElementById("mainTitle").style="display:none;";
    document.getElementById("supportDisplay").style="display:none;";
    document.getElementById("contactDisplay").style="display:none;";
    document.getElementById("what").className="";
    document.getElementById("conway").className="";
    document.getElementById("main").className="";
    document.getElementById("support").className="";
    document.getElementById("contact").className="";
    switch(e.target.id){
        case "what":
            document.getElementById("whatDisplay").style="display:block;";
            document.getElementById("what").className="selected";
            break;
        case "conway":
            document.getElementById("conwayDisplay").style="display:block;";
            document.getElementById("conway").className="selected";
            break;
        case "main":
            document.getElementById("mainTitle").style="display:block;";
            document.getElementById("main").className="selected";
            break;
        case "support":
            document.getElementById("supportDisplay").style="display:block;";
            document.getElementById("support").className="selected";
            break;
        case "contact":
            document.getElementById("contactDisplay").style="display:block;";
            document.getElementById("contact").className="selected";
    }
}