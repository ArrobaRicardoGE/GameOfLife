class keygen{
    constructor(n,m,of){
        if(typeof(n)=="string"){
            this.key=n;
        }
        else{
            let count = 0;
            let local = "";
            this.key="";
            for(let i=of/2;i<n+of/2;i++){
                for(let j=of/2;j<m+of/2;j++){
                    if(document.getElementById(i+"-"+j).className=="alive")local+="1";
                    else local+="0";
                    count++;
                    if(count==4){
                        this.key+=parseInt(local,2).toString(16);
                        local="";
                        count=0;
                    }
                }
            }
        }
    }
    patternBuilder(n,m,of){
        let count = 0;
        let local = "";
        for(let i=of/2;i<n+of/2;i++){
            for(let j=of/2;j<m+of/2;j++){
                if(count%4==0){
                    local = parseInt(this.key[count/4],16).toString(2);
                    while(local.length<4){
                        local="0"+local;
                    }
                }
                if(local[count%4]=="0")document.getElementById(i+"-"+j).className = "dead";
                else{
                    document.getElementById(i+"-"+j).className = "alive";
                }
                count++;
            }
        }
    }
}