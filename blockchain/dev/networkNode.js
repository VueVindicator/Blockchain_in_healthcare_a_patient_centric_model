var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const cors = require('cors');

app.use(cors())

const port = process.argv[2];
const rp = require('request-promise');

const nodeAddress = uuid().split('-').join('');

medblock = new blockchain();

app.use(bodyParser.json());

app.get('/blockchain', function(req, res){
	res.send(medblock);
});

app.get('/app-blockchain', function(req, res){
	res.json({
		medblock: medblock
	});
});

app.post('/transaction', function(req, res){
	const newTransaction = req.body;
	const blockIndex = medblock.addTransactionToPendingTransactions(newTransaction)
	res.json({ note: `Transaction will be added in block ${blockIndex}`});
});

app.post('/transaction/broadcast', function(req, res){
	const newTransaction = medblock.createNewTransaction(req.body.title, req.body.info, req.body.sender, req.body.recepient);
	medblock.addTransactionToPendingTransactions(newTransaction);

	const requestPromises = [];
	medblock.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/transaction',
			method: 'POST', 
			body: newTransaction,
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises)
	.then(data => {
		res.json({ note: 'Transaction created and broadcast successfully' })
	});
});

app.get('/mine', function(req, res){
	const lastBlock = medblock.getLastBlock();
	const prevBlockHash = lastBlock['hash'];
	const currentBlockData = {
		transactions: medblock.pendingTransactions,
		index: lastBlock['index'] + 1
	};
	const nonce = medblock.proofOfWork(prevBlockHash, currentBlockData);
	const blockHash = medblock.hashBlock(prevBlockHash, currentBlockData, nonce);
	
	//medblock.createNewTransaction(12.5, "00", nodeAddress);

	const newBlock = medblock.createNewBlock(nonce, prevBlockHash, blockHash);

	const requestPromises = [];
	medblock.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/receive-new-block',
			method: 'POST',
			body: { newBlock : newBlock },
			json: true
		};

		requestPromises.push(rp(requestOptions));
	})

	Promise.all(requestPromises)
	// .then(data => {
	// 	const requestOptions = {
	// 		uri: medblock.currentNodeUrl + '/transaction/broadcast',
	// 		method: 'POST',
	// 		body: {
	// 			message: 'Initial transaction',
	// 			sender: "00",
	// 			recepient: nodeAddress
	// 		},
	// 		json: true

	// 	};

	// 	return(rp(requestOptions));

	// })
	.then(data => {
		res.json({
			note: "New block mined and broadcast successfully",
			block: newBlock
		});
	});
});

app.post('/receive-new-block', function(req, res){
	const newBlock = req.body.newBlock;
	const lastBlock = medblock.getLastBlock();
	const correctHash = lastBlock.hash === newBlock.previousBlockHash;
	const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

	if(correctHash && correctIndex){
		medblock.chain.push(newBlock);
		medblock.pendingTransactions  = [];

		res.json({
			note: "Block added to chain successfully",
			newBlock: newBlock
		});

	}else{

		res.json({
			note: 'New block rejected',
			newBlock: newBlock
		});
		
	}
});

//register a node and broadcast that in the network
app.post('/register-and-broadcast-node', function(req, res){
	const newNodeUrl = req.body.newNodeUrl;
	if (medblock.networkNodes.indexOf(newNodeUrl) == -1) medblock.networkNodes.push(newNodeUrl);
	
	const registerNodesPromises = [];
	medblock.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/register-node',
			method: "POST",
			body: { newNodeUrl : newNodeUrl },
			json: true
		};

		registerNodesPromises.push(rp(requestOptions));
	});

	Promise.all(registerNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri: newNodeUrl + '/register-nodes-bulk',
			method: 'POST',
			body: { allNetworkNodes : [ ...medblock.networkNodes, medblock.currentNodeUrl ]},
			json: true
		};

		return rp(bulkRegisterOptions);
	})
	.then(data => {
		res.json({ note: 'New Node Registered with Network Successfully' });
	});
});

app.post('/register-node', function(req, res){
	const newNodeUrl = req.body.newNodeUrl;
	const nodeNotAlreadyPresent = medblock.networkNodes.indexOf(newNodeUrl) == -1;
	const notCurrentNode = medblock.currentNodeUrl !== newNodeUrl;
	if (nodeNotAlreadyPresent && notCurrentNode) medblock.networkNodes.push(newNodeUrl);
	res.json({ note: 'New Node registered successfully with node' })
});

app.post('/register-nodes-bulk', function(req, res){
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = medblock.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = medblock.currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) medblock.networkNodes.push(networkNodeUrl);
	});

	res.json({ note: "Bulk registration successful" });
});

app.get('/consensus', function(req, res){
	const promiseArray = [];
	medblock.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/blockchain',
			method: 'GET',
			json: true
		};

		promiseArray.push(rp(requestOptions));
	});

	Promise.all(promiseArray)
	.then(blockchains => {
		const currentChainLength = medblock.chain.length;
		let maxChainLength = currentChainLength;
		let newLongestChain = null;
		let newPendingTransactions = null;

		blockchains.forEach(blockchain => {

			if(blockchain.chain.length > maxChainLength){
				maxChainLength = blockchain.chain.length;
				newLongestChain = blockchain.chain;
				newPendingTransactions = blockchain.pendingTransactions;
			};

		});

		if(!newLongestChain || (newLongestChain && !medblock.chainIsValid(newLongestChain))){

			res.json({
				note: 'Current chain has not been replaced',
				chain: medblock.chain
			});

		}
		else{

			medblock.chain = newLongestChain;
			medblock.pendingTransactions = newPendingTransactions;
			res.json({
				note: 'This chan has been replaced',
				chain: medblock.chain
			});

		}
	});
});

app.get('/block/:blockHash', function(req, res){
	const blockHash = req.params.blockHash;
	const correctBlock = medblock.getBlock(blockHash);
	res.json({
		note: "Block Property",
		block: correctBlock
	});
});

app.get('/transaction/:transactionId', function(req, res){
	const transactionId = req.params.transactionId;
	const correctBlock = medblock.getTransactionBlock(transactionId);
	res.json({
		note: "BlockProperty",
		block: correctBlock
	});
});

// app.get('/block-explorer', function(req, res){
// 	res.sendFile('./block-explorer/index.html', { root: __dirname });
// })

app.get('/address/:address', function(req, res){
	const address = req.params.address;
	const addressData = medblock.getAddressData(address);
	res.json({
		addressData: addressData
	});
});

app.listen(port, function(){
	console.log(`Listening on port ${port}...`);
});