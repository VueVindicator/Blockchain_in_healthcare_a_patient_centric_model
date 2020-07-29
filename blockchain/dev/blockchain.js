const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1')

function Blockchain() {
	this.chain = [];
	this.pendingTransactions = [];
	this.createNewBlock(100, '0', '0');
	this.currentNodeUrl = currentNodeUrl;
	this.networkNodes = [];
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
	const newBlock = {
		index: this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce,
		hash: hash,
		previousBlockHash: previousBlockHash
	};

	this.pendingTransactions = [];
	this.chain.push(newBlock);

	return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
	return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(title, info, sender, recepient) {
	const newTransaction = {
		title: title,
		info: info,
		sender: sender,
		recepient: recepient,
		transactionId: uuid().split('-').join('')
	};

	return newTransaction;

	// this.pendingTransactions.push(newTransaction);

	// return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);
	return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	while (hash.substring(0, 4) !== '0000') {
		nonce++;
		hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
		//console.log(hash);
	}

	return nonce;
}

Blockchain.prototype.chainIsValid = function(blockchain) {
	let validChain = true;

	for (var i = 1; i < blockchain.length; i++) {
		const currentBlock = blockchain[i];
		const previousBlock = blockchain[i - 1];

		const check = this.hashBlock(previousBlock['hash'], {
			transactions: currentBlock['transactions'],
			index: currentBlock['index']
		}, currentBlock['nonce'])

		if (check.substring(0, 4) !== '0000') {
			validChain = false;
		};

		if (currentBlock['previousBlockHash'] !== previousBlock['hash']) validChain = false;
		
		console.log(`Previous Block Hash: ${previousBlock['hash']}`)
		console.log(`Current Block Hash: ${currentBlock['hash']}`)
	};

	const genesisBlock = blockchain[0];
	const correctNonce = genesisBlock['nonce'] === 100;
	const correctPrevBlockHash = genesisBlock['previousBlockHash'] === '0';
	const correctHash = genesisBlock['hash'] === '0';
	const correctTransactions = genesisBlock['transactions'].length === 0;

	if (!correctNonce || !correctPrevBlockHash || !correctHash || !correctTransactions) {
		validChain == false;
	}

	return validChain;
};

Blockchain.prototype.getBlock = function(blockHash){
	let correctBlock = null;
	this.chain.forEach(block => {
		if(block.hash === blockHash) correctBlock = block;
	});
	return correctBlock;
};

Blockchain.prototype.getTransactionBlock = function(transactionId){
	let correctBlock = null;
	let correctTransaction = null;
	// this.chain.forEach(idBlock => {
	// 	if(idBlock.transactions.transactionId === transactionId){
	// 		correctBlock = idBlock;
	// 		//correctTransaction = transactions;
	// 	}
	// });
	//or
	this.chain.forEach(idBlock => {
		idBlock.transactions.forEach(transaction => {
			if(transaction.transactionId === transactionId){
				correctTransaction = transaction;
				correctBlock = idBlock;
			} 
		});
	});

	return {
		transaction: correctTransaction,
		block: correctBlock
	}
};

Blockchain.prototype.getAddressData = function(address){
	const addressTransactions = [];
	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if(transaction.sender === address || transaction.recepient === address){
				addressTransactions.push(transaction);
			};
		});
	});

	// let balance = 0;
	// addressTransactions.forEach(transaction => {
	// 	if(transaction.recepient === address) balance += transaction.amount;
	// 	else if(transaction.sender === address) balance -= transaction.amount;
	// });

	return {
		addressTransactions: addressTransactions,
		//addressBalance: balance
	}
};

module.exports = Blockchain;