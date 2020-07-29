<template>
    <div>
        <Sidebar></Sidebar>
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <h1 id="page-title">Block Explorer</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <form @submit.prevent="search(searchValue)">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Select option and input value">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="searchType">
                                <option value="block">Block Hash</option>
                                <option value="transaction">Transaction ID</option>
                                <option value="address">Address</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            class="btn btn-primary margin-auto btn-search">
                                Search
                        </button>
                        <p v-if="!block && !transaction && !addressData && initialSearchMade" class="no-data-text">
                            No data found for search.
                        </p>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
    
                    <h3 class="table-title" v-if="block">Block</h3>
                    <table class="table table-striped" v-if="block">
                        <tbody>
                            <tr>	
                                <td class="bold">Block Hash</td>
                                <td>{{block.hash}}</td>
                            </tr>
                            <tr>	
                                <td class="bold">Index</td>
                                <td>{{block.index}}</td>
                            </tr>
                            <tr>	
                                <td class="bold">Time Stamp</td>
                                <td>{{block.timestamp}}</td>
                            </tr>
                            <tr>	
                                <td class="bold">Nonce</td>
                                <td>{{block.nonce}}</td>
                            </tr>
                            <tr>	
                                <td class="bold">Previous Hash</td>
                                <td>{{block.previousBlockHash}}</td>
                            </tr>
                            <tr>	
                                <td class="bold">Number Transactions</td>
                                <td>{{block.transactions.length}}</td>
                            </tr>
                        </tbody>
                    </table>
    
                    <h3 class="table-title" v-if="transaction">Transaction</h3>
                    <table class="table table-striped" v-if="transaction">
                        <tbody>
                            <tr>	
                                <td class="bold">Sender</td>
                                <td>{{transaction.sender}}</td>
                            </tr>
                            <tr>	
                                <td class="bold">Recipient</td>
                                <td>{{transaction.recepient}}</td>
                            </tr>
                            <tr>	
                                <td class="bold">Message</td>
                                <td>{{transaction.message}}</td>
                            </tr>
                        </tbody>
                    </table>
    
                    <h3 class="table-title" v-if="addressData">Address</h3>
                    <table class="table table-striped" v-if="addressData">
                        <thead>
                            <tr>
                                <th scope="col">Sender</th>
                                <th scope="col">Recipient</th>
                                <th scope="col">Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="transaction of addressData.addressTransactions">
                                <td>{{transaction.sender}}</td>
                                <td>{{transaction.recepient}}</td>
                                <td>{{transaction.message}}</td>
                            </tr>
                        </tbody>
                    </table>
    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from '../components/sidebar.vue';
    export default {
        components: {
            Sidebar: Sidebar
        },
        data(){
            return {
                searchValue: '',
                searchType: '',
                block: null,
                addressData: null,
                transaction: null,
                initialSearchMade: false
            }
        },
        methods: {
            fetchBlock(blockHash) {
				fetch(`http://localhost:3001/block/${blockHash}`)
				.then(res => {
                    res.json()
					.then(response => {
                        this.block = response.block;
					    this.transaction = null;
					    this.addressData = null;
                    })
				});
            },
            fetchTransaction(transactionId) {
				fetch(`http://localhost:3001/transaction/${transactionId}`)
				.then(res => {
                    res.json()
					.then(response => {
                        this.transaction = response.transaction;
					    this.block = null;
					    this.addressData = null;
                    })
				});				
            },
            fetchAddressData(address) {
				fetch(`http://localhost:3001/address/${address}`)
				.then(res => {
                    res.json()
                    .then(response => {
                        this.addressData = response.addressData;
                        if (!this.addressData.addressTransactions.length) this.addressData = null;
                        this.block = null;
                        this.transaction = null;
                    })
				});				
            },
            search(searchValue) {
				this.initialSearchMade = true;
				if (this.searchType === 'block') {
					this.fetchBlock(searchValue);
				}
				else if (this.searchType === 'transaction') {
					this.fetchTransaction(searchValue);
				}
				else if (this.searchType === 'address') {
					this.fetchAddressData(searchValue);
				}
			},
        }
    }
</script>
<style>
    #page-title {
        text-align: center;
        margin-bottom: 40px;
    }
    .table-title {
        margin-bottom: 20px;
        text-align: center;
    }
    .table {
        background-color: #ffffff;
        box-shadow: 2px 2px 15px -3px rgba(0,0,0,0.75);
    }
    .margin-auto {
        margin: auto;
        display: block;
    }
    .btn-search {
        margin-bottom: 50px;
    }
    .bold {
        font-weight: 700;
    }
    .no-data-text {
        color: red;
        text-align: center;
    }
</style>
