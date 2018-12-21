
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
        return parseInt(num.slice(num.length-26), 16);
    },
    
    parseDate(num){
        let tmp = parseInt(num, 16);
        let d = new Date(tmp*1000);
        return `${d.getUTCHours()}h ${d.getMinutes()}m ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    }
}