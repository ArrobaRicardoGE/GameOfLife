/*
Conway´s Game of Life
ArrobaRicardoGE
Version 1.0 - June 2020
*/

//Variables
let rowsN = 75;
let colN = 140;
let offset = 40;
let returnVal = null;
let flag = false;
let keySaver = null;
let localSave = new KeyGenV2("O2903");
let textVariables = document.getElementById("textVariables");

//Table creation
let table = document.createElement("table");
document.getElementById("GameOfLife").appendChild(table);
for(let i=0;i<rowsN+offset;i++){
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for(let j=0;j<colN+offset;j++){
        let cell = document.createElement("td");
        tr.appendChild(cell);
        if(i<offset/2 || i>=rowsN+offset/2 || j<offset/2 || j>=colN+offset/2)
            cell.style.display="none"
        cell.addEventListener("mousemove",toggle);
        cell.className = "dead";
        cell.id = i+"-"+j;
    }
}

//Table functions
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
    generation = 0;
    document.getElementById("Board").childNodes[1].textContent = textVariables.children[2].textContent+generation;
}

//Animation
let generation = 0;
function frame(){
    let change = [];
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
    if(change.length == 0){
        window.cancelAnimationFrame(returnVal);
        showMsg(textVariables.children[3].textContent);
        document.getElementById("Begin").childNodes[0].textContent=textVariables.children[0].textContent;
        document.getElementById("Begin").childNodes[2].className="fas fa-play";
        return;
    }
    generation++;
    document.getElementById("Board").childNodes[1].textContent = textVariables.children[2].textContent+generation;
    for(let i=0;i<change.length;i++){
        if(document.getElementById(change[i]).className=="alive")document.getElementById(change[i]).className="dead";
        else document.getElementById(change[i]).className="alive";
    }
    returnVal = window.requestAnimationFrame(frame);
}
function toggle(event){
    if(!flag)return;
    if(event.altKey){
        if((event.target).className == "alive")(event.target).className = "dead"
    }
    else if((event.target).className != "alive")(event.target).className = "alive"
}


//Event listeners
table.addEventListener("mousedown",function(event){
    flag=true;
    if((event.target).className == "alive")(event.target).className =  "dead";
    else if(!event.altKey)(event.target).className = "alive"
});
table.addEventListener("mouseup",function(){
    flag=false;
    localSave = new KeyGenV2(rowsN,colN,offset);
});

document.getElementById("Begin").addEventListener("click",function(){
    if(this.childNodes[0].textContent==textVariables.children[0].textContent){
        returnVal = window.requestAnimationFrame(frame);
        this.childNodes[0].textContent=textVariables.children[1].textContent;
        this.childNodes[2].className="fas fa-stop";
        if(localSave.key=="O2903")localSave = new KeyGenV2(rowsN,colN,offset);
    }
    else{
        window.cancelAnimationFrame(returnVal);
        this.childNodes[0].textContent=textVariables.children[0].textContent;
        this.childNodes[2].className="fas fa-play";
    }
});
document.getElementById("Clear").addEventListener("click",function(){
    window.cancelAnimationFrame(returnVal);
    resetBoard();
    document.getElementById("Begin").childNodes[0].textContent=textVariables.children[0].textContent;
    document.getElementById("Begin").childNodes[2].className="fas fa-play";
    localSave = new KeyGenV2("O2903");
});
document.getElementById("Reset").addEventListener("click",function(){
    window.cancelAnimationFrame(returnVal);
    resetBoard();
    localSave.buildPattern(rowsN,colN,offset);
    document.getElementById("Begin").childNodes[0].textContent=textVariables.children[0].textContent;
    document.getElementById("Begin").childNodes[2].className="fas fa-play";
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
    localSave = keyLoad;
    resetBoard();
    showMsg(keyLoad.buildPattern(rowsN,colN,offset)?textVariables.children[5].textContent:textVariables.children[6].textContent);
    document.getElementById("LoadKey").style="display:none;";
});
document.getElementById("Copy").addEventListener("click",function(){
    document.getElementById("keyDisplay").select();
    document.execCommand("copy");
    document.getElementById("GeneratedKey").style="display:none;";
    showMsg(textVariables.children[4].textContent);
});
document.getElementById("Library").addEventListener("click",function(){
    document.getElementsByClassName("library")[0].style.display="block";
});
let showGrid=true;
document.getElementById("Grid").addEventListener("click",function(){
    if(showGrid){
        document.documentElement.style.setProperty("--gridColor","rgb(0,0,0)");
        document.documentElement.style.setProperty("--gridWeight","0px");
        this.className="notselected";
        showGrid=false;
    }
    else{
        document.documentElement.style.setProperty("--gridColor","rgb(100,100,100)");
        document.documentElement.style.setProperty("--gridWeight","1px");
        showGrid=true;
        this.className="";
    }
});
document.getElementById("Msg").addEventListener("click",function(){
    allowMsg = !allowMsg;
    this.className = allowMsg?"":"notselected";
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
    switch(e.currentTarget.id){
        case "what":
            document.getElementById("whatDisplay").style="display:block;";
            document.getElementById("what").className="selected";
            break;
        case "conway":
            document.getElementById("conwayDisplay").style="display:block;";
            document.getElementById("conway").className="selected";
            break;
        case "main":
            console.log("in");
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
let libraryContentBtns = document.getElementsByClassName("librarySectionBtn");
for(let i=0;i<libraryContentBtns.length;i++){
    libraryContentBtns[i].addEventListener("click",function(){
        let libraryContent = this.nextElementSibling;
        libraryContent.style.maxHeight = (libraryContent.style.maxHeight == "0px" || libraryContent.style.maxHeight == 0)?libraryContent.scrollHeight+"px":0;
    })  
}
let exitBtns = document.getElementsByClassName("exit");
for(let i=0;i<exitBtns.length;i++){
    exitBtns[i].addEventListener("click",function(){
        this.parentNode.style.display="none";
    });
}
let libraryElements = document.getElementsByClassName("libraryElement");
for(let i=0;i<libraryElements.length;i++){
    libraryElements[i].addEventListener("click",function(){
        let pat = new KeyGenV2(this.id);
        resetBoard();
        pat.buildPattern(rowsN,colN,offset);
        localSave = pat;
        document.getElementsByClassName("library")[0].style.display="none";
    });
}
let allowMsg = true;
function showMsg(msg){
    if(!allowMsg)return;
    console.log(true);
    document.getElementById("message").childNodes[3].textContent=msg;
    document.getElementById("message").style.width = "25vw";
    setTimeout(function(){document.getElementById("message").style.width = "0";},4000);
}
document.getElementById("Help").addEventListener("click",function(){
    document.getElementsByClassName("library")[1].style.display="block";
})