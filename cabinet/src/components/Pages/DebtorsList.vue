<template>
    <div>
        <div class="card mx-0 py-0 px-0 my-0">
                    
                    <div class="card-header d-flex">
                        <select v-model="branch" class="form-select form-select-sm mx-2" aria-label=".form-select-sm example" 
                            style="width:220px;height:30px;" aria-placeholder="Выберите подразделение" >
                            <option  disabled value="" selected>Выберите подразделение...</option>
                            <option  v-for="branch in branches" :key="branch.id" :value="branch" >{{branch.name}}</option>
                        </select>
                        <p class="mx-2">Задолженность</p>
                        <input class="mx-2" style="width:80px;height:30px;" v-model.number="amount" type="number"/>
                        <span v-show="Object.keys(debtorslist).length!==0" @click="exportExcel()"><font-awesome-icon  icon="file-excel" /></span>
                        <button class="mx-2 w-145 text-light" style="background:#276595;align:center;position: absolute; right: 0;" @click="getDebtorsList()">Получить данные</button>
                    </div>
                    <div class="card-body px-0 py-0 my-0">
                        <table class="table table-hover table-bordered"> 
                                <thead class="text-light text-center" style="background:#276595;">
                                    <th scope="col">Имя</th>
                                    <th scope="col">Адрес</th>
                                    <th scope="col">Телефон</th>
                                    <th scope="col">Долг</th>
                                    <th scope="col">Лицевой счет</th>
                                    <th scope="col">№ договора</th>
                                    <th scope="col">Тип договора</th>
                                    <th scope="col">Упр. компания</th>
                                    
                                    
                                </thead>
                                <tbody v-for="debtor in debtorslist" :key="debtor.id">
                                    <tr>
                                    <!--<tr v-show="debtor.count_flats == 0 || debtor.count_flats == null || debtor.count * 100 / debtor.count_flats >= percent"> -->
                                        <th scope="row">{{ debtor.name }}</th>
                                        <td>{{ debtor.cap }}</td>
                                        <td>{{ debtor.phone }}</td>
                                        <td>{{ debtor.amount }}</td>
                                        <td>{{ debtor.pa }}</td>
                                        <td>{{ debtor.docnum }}</td>
                                        <td>{{ debtor.contract }}</td>
                                        <td>{{ debtor.management }}</td>
                                        
                                 
                                        
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            <div id="backdrop" v-show="loading">    
            <div class="overlay" >
                <div class="spinner-grow text-primary"  style="width: 3rem; height: 3rem; justify-content: center; align-items: center;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { saveExcel } from '@progress/kendo-vue-excel-export';
    export default {
        name: "DebtorsList",
        data() {
            return {
                debtorslist:{},
                
                branches:[],
                branch: {},
                types: {},
                amount: 1000,
                percent:30,
                loading: false,
                
            }
        },

        methods: {
            
            async getBranches(){
                this.loading = true
                var user = this.$store.state.auth.user
                if(this.$store.state.auth.user.session.staff.full_access === 1){
                    
                    this.$store.dispatch('reports/Branch', user.session.client.key).then(
                        (branch) => {
                            branch.branch.forEach(b =>{
                                this.branches.push({id: b.id, name: b.name})
                            })
                            
                            
                            this.loading = false
                        },
                        (error) => {
                            
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                            alert(this.message)
                            console.log(this.message)
                            this.loading = false;
                        }
                    )
                } else {
                        let branch_id = this.$store.state.auth.user.session.branch.id
                        this.$store.dispatch('reports/Branches',  {key:user.session.client.key, branch: branch_id}).then(
                        (branch) => {
                            
                            branch.branch.forEach(b =>{
                                this.branches.push({id: b.id, name: b.name})
                            })
                            this.loading = false
                        },
                        (error) => {
                            
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                            alert(this.message)
                            console.log(this.message)
                            this.loading = false;
                        }
                    )
                }
            },

            async getDebtorsList(){
                if (Object.keys(this.branch).length === 0){
                    alert('Выберите подразделение')
                    return 
                }
                this.loading = true
                var user = this.$store.state.auth.user
                this.$store.dispatch('reports/DebtorsList', {key:user.session.client.key, branch: this.branch.id, amount: this.amount}).then(
                    (debtorslist) => {
                        this.debtorslist = debtorslist.debtors
                        console.log(this.debtors)
                        this.loading = false
                    },
                    (error) => {
                        this.message =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                        this.successful = false;
                        alert(this.message)
                        console.log(this.message)
                        this.loading = false;
                        })
                    
                    
                
            },
            exportExcel () {
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                saveExcel({
                    data: this.debtorslist,
                    fileName: "Должники_"+ today.toISOString().slice(0,10),
                    columns: [
                        { field: 'name', title: "Имя"},
                        { field: 'cap', title: 'Адрес' },
                        { field: 'FORMALNAME', title:'Улица' },
                        { field: 'HOUSENUM', title:'Дом' },
                        { field: 'flat', title:'Квартира' },
                        { field: 'phone', title: 'Телефон' },
                        { field: 'amount', title: "Долг"},
                        { field: 'pa', title: 'Лицевой счет' },
                        { field: 'docnum', title: '№ договора' },
                        { field: 'contract', title: "Тип договора"},
                        { field: 'management', title: 'Упр. компания' }
                    ]
                });
            },
        },



        mounted() {
            document.title = "КСУ Неплательщики (абоненты)"
                        
         },
         beforeMount(){
             this.getBranches()

         },
    }
</script>

<style scoped>
.overlay {
    background-color: #EFEFEF;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: .5;
    filter: alpha(opacity=50);
}

#backdrop {
    background-color: #EFEFEF;
    position:absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    /* opacity: .8; */
    /* filter: alpha(opacity=80); */
}
</style>