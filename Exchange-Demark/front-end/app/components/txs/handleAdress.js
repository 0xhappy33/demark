
module.exports={
    handleAddr(str){
        return '0x'+str.slice(str.length-40);
    },
    parseBlock(num){
        return parseInt(num, 16);
    },
    parseAmount(num){
        return parseInt(num, 16)/1000000000000000000+" ETH";
    },
    parseToken(num){
        return parseInt(num, 16)/1000000000000000000;
    },

    parseValueToken(str){
        let start= str.indexOf('x') + 1;
        let start2 = start.indexOf(num2!==0);
        let arrSplit = num.split(start);
        return parseInt(num, 16);
    },

    parseDate(num){
        let tmp = parseInt(num, 16);
        let d = new Date(tmp*1000);
        return `${d.getUTCHours()}h ${d.getMinutes()}m ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    }
}