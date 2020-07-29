const blockchain = require('./blockchain_test.js');
const bitcoin = new blockchain();
nonce = 100;
hash = 'KSHUA2U3H982342UIH';
previousBlockHash = 'KUHISDE9487Y4HIUH';

bitcoin.createNewBlock(nonce, hash, previousBlockHash);
bitcoin.createNewTransaction(200, 'KJNDH98394HIUDH', 'DOSIJOIJ43J49839');
bitcoin.createNewTransaction(300, 'JDIOSUJODSJ983832', 'JSDKLNDNDS989328');
bitcoin.createNewBlock(2332, 'SIJDOISJOIJD3298', 'JNDSKJSHDI29383');

console.log(bitcoin);