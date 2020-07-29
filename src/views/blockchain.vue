<template>
    <div>
        <Sidebar></Sidebar>
        <div class="container-fluid text-center">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="table-title" v-if="blocks">BlockChain Transactions</h3>
                    <div class="accordion accordion-light" id="accordion-3">
                        <table class="table table-striped" v-if="blocks">
                            <thead>
                                <th>Index</th>
                                <th>Timestamp</th>
                                <th>Block Info</th>
                            </thead>
                            <tbody>
                                <tr v-for="block of blocks">	
                                    <td class="bold">{{block.index}}</td>
                                    <td>{{block.timestamp}}</td>
                                    
                                        <td><button class="btn btn-primary" data-toggle="collapse" v-bind:href="'#collapse-' + block.index">Block Info</button>
                                        <div class="card">
                                            <div v-bind:id="'collapse-' + block.index" class="collapse" data-parent="#accordion-3">
                                                <div class="card-body">
                                                    <table class="table table-striped" v-if="blocks">
                                                        <thead>
                                                            <th>Transaction ID</th>
                                                            <th>Information</th>
                                                            <th>Sender</th>
                                                            <th>Recepient</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-if="block.transactions" v-for="trans of block.transactions">
                                                                <td>{{trans.transactionId}}</td>
                                                                <td>{{trans.info}}</td>
                                                                <td>{{trans.sender}}</td>
                                                                <td>{{trans.recepient}}</td>
                                                            </tr>
                                                            <tr v-else>Genesis Block</tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
                blocks: []
            }
        },
        methods: {

        },
        created(){
            fetch('http://localhost:3001/app-blockchain', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => [
                res.json()
                .then(response => {
                    this.blocks = response.medblock.chain
                })
            ])
        }
    }
</script>