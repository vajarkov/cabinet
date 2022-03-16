<template>
    <div>
        
        <div v-show="Object.keys(montages).length!==0">
           <span v-show="Object.keys(montages).length!==0" @click="exportExcel()"><font-awesome-icon  icon="file-excel" /></span>
                    <table class="table table-hover table-bordered caption-top">
                        <caption>{{name}}({{status}})</caption>
                        <thead class="text-light text-center" style="background:#276595;">
                            <th scope="col">Номер</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Тип</th>
                            <th scope="col">Адрес</th>
                            <th scope="col">Коментарий</th>
                            <th scope="col">Мастер</th>
                                
                        </thead>
                        <tbody v-for="montage in montages" :key="montage.id">
                            <tr>
                                <th scope="row">{{ montage.numdoc }}</th>
                                <td>{{ montage.datedoc }}</td>
                                <td>{{ montage.type }}</td>
                                <td>{{ montage.address }}</td>
                                <td>{{ montage.cmnt }}</td>
                                <td >{{ montage.name }}</td>
                                <!--- class="d-none d-lg-table-cell" -->
                            </tr>
                        </tbody>
                    </table>
                
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
    import { useRoute } from "vue-router";
    export default {
        name: 'MontagesStatus',
        components:{
           
        },
        data() {

            return {
                montages: [],
                name: "",
                status: "",
                loading: false,
            }
        },
        methods:{
            getMontages(branch_id, status_id){
                this.loading = true
                
                var user = this.$store.state.auth.user
                this.$store.dispatch('reports/getMontages', {branch_id: branch_id , status_id: status_id, key: user.session.client.key}).then(
                    (montages) => {
                        
                        this.montages = montages.montages
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
                        this.loading = false;
                        console.log(this.message)
                        }
                )
            },
            exportExcel () {
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                saveExcel({
                    data: this.montages,
                    fileName: "Монтажи_"+ today.toISOString().slice(0,10),
                    columns: [
                        { field: 'numdoc', title: 'Номер' },
                        { field: 'datedoc', title:'Дата' },
                        { field: 'type', title:'Тип' },
                        { field: 'address', title:'Адрес' },
                        { field: 'cmnt', title:'Коментарий' },
                        { field: 'name', title:'Мастер' },
                    ]
                });
            },
        },
        mounted() {
            document.title = "КСУ Заявки"
            const route = useRoute()
            this.getMontages(route.params.branch_id, route.params.status_id)
            this.name = route.params.name
            this.status = route.params.status
            
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