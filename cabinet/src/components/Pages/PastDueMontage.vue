<template>
    <div>
        <div v-show="Object.keys(pastdue).length!==0">
            <table class="table table-hover table-bordered"> 
                    <thead class="text-light text-center" style="background:#276595;">
                        <th scope="col">Номер</th>
                        <th scope="col">Дата</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Адрес</th>
                        <th scope="col">Комментарий</th>
                        <th scope="col">Сообщение</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Мастер</th>
                    </thead>
                    <tbody v-for="request in pastdue" :key="request.id">
                        <tr>
                            <th scope="row">{{ request.numdoc }}</th>
                            <td>{{ request.datedoc }}</td>
                            <td v-bind:style="[request.status_id == 1 ? {'color':'#0f9379'} : request.status_id == 2 ? {'color':'#f6bf62'} :  {'color':'black'}]">{{ request.status }}</td>
                            <td>{{ request.address }}</td>
                            <td>{{ request.cmnt }}</td>
                            <td>{{ request.message }}</td>
                            <td>{{ request.branch }}</td>
                            <td>{{ request.name }}</td>
                            <!-- class="d-none d-lg-table-cell" -->
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
    
    export default {
        name: "PastDueMontage",
        
        data() {

            return {
                
                pastdue: {},
                loading: false,
                
                
                
            }
        },


        
        mounted() {
            document.title = "КСУ Просроченные заявки"
            this.getPastDue();
        },


        methods: {
            getPastDue(){
                this.loading = true
                var user = this.$store.state.auth.user
                if(this.$store.state.auth.user.session.staff.full_access === 1){
                    this.$store.dispatch('montage/pastDue', user.session.client.key).then(
                        (pastdue) => {
                            
                            this.pastdue = pastdue.pastdue
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
                } else {
                    this.$store.dispatch('montage/pastDueBranch', user.session.client.key).then(
                        (pastdue) => {
                            
                            this.pastdue = pastdue.pastdue
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
                }
            },

            
        }



    }
</script>

<style lang="scss" scoped>
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