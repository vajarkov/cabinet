<template>
    <div>
        
        <div v-show="Object.keys(requests).length!==0">
           
                    <table class="table table-hover table-bordered caption-top">
                        <caption>{{name}}({{status}})</caption>
                        <thead class="text-light text-center" style="background:#276595;">
                            <th scope="col">Номер</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Адрес</th>
                            <th scope="col">Коментарий</th>
                                
                        </thead>
                        <tbody v-for="request in requests" :key="request.id">
                            <tr>
                                <th scope="row">{{ request.numdoc }}</th>
                                <td>{{ request.datedoc }}</td>
                                <td>{{ request.address }}</td>
                                <td>{{ request.cmnt }}</td>
                            
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
    import { useRoute } from "vue-router";
    export default {
        name: 'RequestsStatus',
        components:{
           
        },
        data() {

            return {
                requests: [],
                name: "",
                status: "",
            }
        },
        methods:{
            getRequests(org_id, status_id){
                this.loading = true
                
                var user = this.$store.state.auth.user
                this.$store.dispatch('reports/getRequests', {org_id: org_id , status_id: status_id, key: user.session.client.key}).then(
                    (requests) => {
                        
                        this.requests = requests.requests
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
        },
        mounted() {
            document.title = "КСУ Заявки"
            const route = useRoute()
            this.getRequests(route.params.org_id, route.params.status_id)
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