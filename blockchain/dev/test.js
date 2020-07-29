const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
// const previousBlockHash = 'KJJHNKDHKHKJKJDKJNJND' ;
// const currentBlockData = [
// {
// 	amount: 20,
// 	sender: 'ijosodjoidsjdojsodjs',
// 	recepient: 'isliduliu43iuh4iu'
// },
// {
// 	amount: 100,
// 	sender: 'dkjndkjdnkjnk2323',
// 	recepient: '32k3kjnkjnk2333'
// },
// {
// 	amount: 102,
// 	sender: '32jkn2333ojjj3op33',
// 	recepient: '3ji3oij3oij323jo32j'
// }
// ]
// const nonce = 100;

// hashed = bitcoin.hashBlock(previousBlockHash, currentBlockData, 87811);

// correctHash = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

// console.log(bitcoin);
const bc1 = {
	"chain": [{
		"index": 1,
		"timestamp": 1575651094434,
		"transactions": [],
		"nonce": 100,
		"hash": "0",
		"previousBlockHash": "0"
	}, {
		"index": 2,
		"timestamp": 1575651188234,
		"transactions": [],
		"nonce": 18140,
		"hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
		"previousBlockHash": "0"
	}, {
		"index": 3,
		"timestamp": 1575651224270,
		"transactions": [{
			"transactionId": "e16201f0184811ea97540d5e53122ce7"
		}, {
			"transactionId": "ee596790184811ea97540d5e53122ce7"
		}, {
			"transactionId": "f066ead0184811ea97540d5e53122ce7"
		}, {
			"transactionId": "f31f7b20184811ea97540d5e53122ce7"
		}],
		"nonce": 40425,
		"hash": "00007cddb44354da0034a43d63b61052813c560fd094d2821d81bae651adefd6",
		"previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
	}, {
		"index": 4,
		"timestamp": 1575651265549,
		"transactions": [{
			"transactionId": "f6a1eb20184811ea97540d5e53122ce7"
		}, {
			"transactionId": "fe912b20184811ea97540d5e53122ce7"
		}, {
			"transactionId": "05908ce0184911ea97540d5e53122ce7"
		}, {
			"transactionId": "0a5b5b60184911ea97540d5e53122ce7"
		}],
		"nonce": 62267,
		"hash": "0000e073eca9861c0b6c968bb85cbd25aa6ef47acd392d56d4fc3e45ef691c70",
		"previousBlockHash": "00007cddb44354da0034a43d63b61052813c560fd094d2821d81bae651adefd6"
	}, {
		"index": 5,
		"timestamp": 1575651309151,
		"transactions": [{
			"transactionId": "0f3c7100184911ea97540d5e53122ce7"
		}, {
			"transactionId": "17c1d680184911ea97540d5e53122ce7"
		}, {
			"transactionId": "1dffe410184911ea97540d5e53122ce7"
		}, {
			"transactionId": "21da1100184911ea97540d5e53122ce7"
		}],
		"nonce": 139507,
		"hash": "00008cf388ba4d87915363eb0c178c9339ac5f1182bcfd54d2c07c48b0dddca1",
		"previousBlockHash": "0000e073eca9861c0b6c968bb85cbd25aa6ef47acd392d56d4fc3e45ef691c70"
	}, {
		"index": 6,
		"timestamp": 1575651350508,
		"transactions": [{
			"transactionId": "2939e240184911ea97540d5e53122ce7"
		}, {
			"transactionId": "331bf190184911ea97540d5e53122ce7"
		}, {
			"transactionId": "35907400184911ea97540d5e53122ce7"
		}, {
			"transactionId": "38703b60184911ea97540d5e53122ce7"
		}, {
			"transactionId": "3b056530184911ea97540d5e53122ce7"
		}, {
			"transactionId": "3dabcd10184911ea97540d5e53122ce7"
		}],
		"nonce": 114136,
		"hash": "0000914f7e3b6aea1a94f6c3a820f6a9604b8f4769740add804f77f2275601d0",
		"previousBlockHash": "00008cf388ba4d87915363eb0c178c9339ac5f1182bcfd54d2c07c48b0dddca1"
	}],
	"pendingTransactions": [{
		"transactionId": "41e0c430184911ea97540d5e53122ce7"
	}],
	"currentNodeUrl": "http://localhost:3001",
	"networkNodes": []
}


checking = bitcoin.chainIsValid(bc1.chain);
console.log('Valid: ', checking);