pragma solidity ^0.4.24;
library SafeMath {
    function mul(uint a, uint b) internal returns (uint) {
        if (a == 0) {
            return 0;
        }
        uint c = a * b;
        require(c / a == b);
        return c;
    }
    function div(uint a, uint b) internal returns (uint) {
        require(b > 0); 
        uint c = a / b;
        return c;
    }
    function sub(uint a, uint b) internal returns (uint) {
        require(b <= a);
        uint c = a - b;
        return c;
    }
    function add(uint a, uint b) internal returns (uint) {
        uint c = a + b;
        require(c >= a);
        return c;
    }
    function mod(uint a, uint b) internal returns (uint) {
        require(b != 0);
        return a % b;
    }
}

contract Token {
    function totalSupply() public view returns (uint) {}
    function balanceOf(address) public view returns (uint) {}
    function transfer(address, uint) public returns (bool) {}
    function transferFrom(address, address, uint) public returns (bool) {}
    function approve(address, uint) public returns (bool) {}
    function allowance(address, address) public view returns (uint) {}
    event Transfer(address indexed, address indexed, uint indexed);
    event Approval(address indexed, address indexed, uint indexed);
}

contract Implement is Token {
    function transfer(address _to, uint _value) public returns (bool success) {
        if (balances[msg.sender] >= _value && _value > 0) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            emit Transfer(msg.sender, _to, _value);
            return true;
        } else {return false;}
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            emit Transfer(_from, _to, _value);
            return true;
        } else {return false;}
    }

    function balanceOf(address _owner) public view returns (uint balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint remaining) {
        return allowed[_owner][_spender];
    }

    mapping (address => uint) balances;
    mapping (address => mapping (address => uint)) allowed;
    
}


contract DTUToken is Implement { 
    using SafeMath for uint;

    string public name;                   
    uint public decimals;               
    string public symbol;                
    uint public rating;    
    uint public totalSupply;         
    address public creator;
    address public cashier;
    string public description;
    uint[] public bonus = [5,6,7];

    modifier onlyCreator(){
        require(msg.sender == creator,"Only creator can call this");
        _;
    }
    modifier _enoughTime(address _addr){
        require((1 minutes + timeRegister[_addr]) <= now,"Not now");
        _;
    }

    event BuyToken(address indexed _from,uint indexed _valueSend,uint indexed _exchange);
    event FundTransfer(address indexed _to,uint indexed _valueSend);
    //event Deposit(address indexed _from,uint indexed _value,string indexed message);
    event Deposit(address indexed _from,uint indexed _valueSend);

    mapping (address => bool) public isRegister;
    mapping (address => uint) public totalBonus;
    mapping (address => uint) public timeRegister;

    constructor (string _name,uint _decimals,string _symbol,uint _unitCan,address _cashier,string _description) public{
        totalSupply = 0;  
        name = _name;                                  
        decimals = _decimals;                                           
        symbol = _symbol;                                            
        rating = _unitCan;                                      
        cashier = _cashier;
        description = _description;
        creator = msg.sender;
    }

    function _getRate(uint _amount) internal returns(uint){ 
        if(_amount >= 50 && _amount < 100)  return _amount.mul(bonus[0]).div(100);
        if(_amount >= 100 && _amount < 500) return _amount.mul(bonus[1]).div(100);      
        if (_amount > 500 ) return _amount.mul(bonus[2]).div(100);
        return 0;
    }
    function _register(address _addr) internal{
        if(!isRegister[_addr]) isRegister[_addr] = true;
        timeRegister[_addr] = now;
    }
    function _buy(address _addr,uint _amount) internal{     
        uint rateBonus = _getRate(_amount);
        //increate balance of sender
        balances[_addr] = balances[_addr].add(_amount);
        //increase totalSupply of contract
        totalSupply = totalSupply.add(_amount);
        //increase bonus token
        totalBonus[_addr] = totalBonus[_addr].add(rateBonus);
        //address(0) : contract transfer new token
        emit Transfer(address(0), _addr, _amount);
    }

    // trader can buy token
    function buyToken(uint _amount) public payable returns(bool){
        address _sender = msg.sender;
        uint senderValue = msg.value;
        uint amountInWei = _amount.mul(1 ether).div(rating);
        require(senderValue >= amountInWei,"Not enough ether");
        uint exchange = senderValue.sub(amountInWei);
        if(exchange > 0) _sender.transfer(exchange);
        if(!isRegister[_sender]) _register(_sender);
        _buy(_sender,_amount);
        emit BuyToken(_sender,senderValue,exchange);
        return true;
    }

    // trader can burn their token to get ether back
    function burn(uint _amount) public returns(bool){
        address _sender = msg.sender;
        require(balances[_sender] >= _amount,"You dont have enough token");
        uint amountInWei = _amount.mul(1 ether).div(rating);
        require(this.balance >= amountInWei,"Contract dont have enough ether");
        balances[_sender] = balances[_sender].sub(_amount);
        totalSupply = totalSupply.sub(_amount);
        _sender.transfer(amountInWei);   //transfer eth from contract to sender
        emit FundTransfer(_sender,amountInWei);

        return true;
    }

    //get reward after 1 year since last reward time
    function reward() public _enoughTime(msg.sender) returns(bool){
        address _sender = msg.sender;
        timeRegister[_sender] = now;
        uint tmp = totalBonus[_sender];
        totalBonus[_sender] = 0;
        balances[_sender] = balances[_sender].add(tmp);
        totalSupply = totalSupply.add(tmp);
        emit Transfer(address(0), _sender, tmp);

        return true;
    }

    //get status of balance, if this value < 0 , server should inform to user know that this contract need supply
    function getState() public view returns(uint){
        uint etherReq = totalSupply;
        return (etherReq.mul(1 ether).div(rating)).sub(this.balance);
    }
    
    function deposit() public payable returns(bool){
        if(msg.value < 0) return false;
        emit Deposit(msg.sender,msg.value); 
        return true;
    }
}