// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SmartWallet {
    mapping(address => uint256) private _balances;
    address private owner;

    constructor() public {
        owner = msg.sender;
    }
    
    function whoIsOwner() public returns(address) {
        //log();
        return owner;
    }
    
    
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function deposit() public payable {
        _balances[msg.sender] += msg.value;
    }
    
    // Exerice 1: 
    // Implementer une fonction withdrawAmount pour permettre à un utilisateur
    // de récupérer un certain amount de ses fonds
    function withdrawAmount(uint256 amount) public {
        // Code a ajouter ici
        require(_balances[msg.sender] >= amount, "SmartWallet: amont exeeds your balance");
        _balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
    
    // Exercice 2:
    // Implementer une fonction transfer pour permettre à un utilisateur d'envoyer
    // des fonds à un autre utilisateur de notre SmartWallet
    // ATTENTION on effectue pas un vrai transfer d'ETHER, 
    // un transfer n'est qu'une ecriture comptable dans un registre
    function transfer(address account, uint256 amount) public {
        // Code à ajouter ici
        require(_balances[msg.sender] >= amount ,"Impossible");
        require(_balances[account] >= 0 ,"Impossible");
        _balances[msg.sender] -= amount;
         _balances[account] += amount;
        payable(account).transfer(amount);
        
    }
    
    function withdraw() public {
        require(_balances[msg.sender] > 0, "SmartWallet: can not withdraw 0 ether");
        uint256 amount = _balances[msg.sender];
        _balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    function total() public view returns (uint256) {
        return address(this).balance;
    }
    
     
}