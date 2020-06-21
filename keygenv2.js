class KeyGenV2{
    constructor(n,m,of){
        if(typeof(n)=="string"){
            this.key=n;
        }
        else{
            let ant = document.getElementById(of/2+"-"+of/2).className=="alive"?"dead":"alive";
            let count=0;
            this.key="";
            for(let i=of/2;i<n+of/2;i++){
                for(let j=of/2;j<m+of/2;j++){   
                    if(document.getElementById(i+"-"+j).className!=ant){
                        if(count!=0){
                            this.key+=document.getElementById(i+"-"+j).className=="alive"?"O":"I";
                            if(count>1)this.key+=parseInt(count-1,10).toString(16);
                        }
                        count=1;
                        ant=document.getElementById(i+"-"+j).className;
                    }
                    else count++;
                }
            }
            if(count!=0){
                this.key+=document.getElementById((n+of/2-1)+"-"+(m+of/2-1)).className=="alive"?"I":"O";
                if(count>1)this.key+=parseInt(count-1,10).toString(16);
            }
        }
    }
    buildPattern(n,m,of){
        let iostring="";
        for(let i=0;i<this.key.length;i++){
            let act=this.key[i];
            let j=i+1;
            let num="";
            while(j<this.key.length && (this.key[j]!="I" && this.key[j]!="O")){
                num+=this.key[j];
                j++;
            }
            if(num=="")num+="0";
            num = parseInt(num,16);
            for(let k=0;k<num+1;k++){
                iostring+=act;
            }
            i=j-1;
        }
        let count=0;
        if(iostring.length!=n*m)return("Error: Invalid key. Verify its integrity");
        for(let i=of/2;i<n+of/2;i++){
            for(let j=of/2;j<m+of/2;j++){   
                document.getElementById(i+"-"+j).className = (iostring[count]=="I"?"alive":"dead");
                count++;
            }
        }
        return("Pattern loaded!");
    }
}