
function abc(str){
    let end=0;
    for(let i=2;i<str.length;i++){
        if(str.charAt(i)==0) end++     
    }

    return str.slice(end+2,str.length)
    
}

abc("0x0000000000000000000000000000000000000000000000000000000007b")

