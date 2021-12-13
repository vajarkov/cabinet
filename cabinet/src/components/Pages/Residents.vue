<template>
    <div>
        <div v-show="Object.keys(residents).length!==0">
            <table class="table table-hover table-bordered"> 
                    <thead class="text-light text-center" style="background:#276595;">
                        <th scope="col">Филиал</th>
                        <th scope="col">Кол-во абонентов (кол-во клиентов)</th>
                        <th scope="col">Кол-во жильцов (всего квартир в подъезде)</th>
                        
                    </thead>
                    <tbody v-for="resident in residents" :key="resident.id">
                        <tr>
                            <th scope="row">{{ resident.name }}</th>
                            <td>{{ resident.abonents }}</td>
                            <td>{{ resident.residents }}</td>
                            <!-- class="d-none d-lg-table-cell" -->
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">Итого</th>
                            <th scope="row">{{ count.abonents }}</th>
                            <th scope="row">{{ count.residents }}</th>
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
        name: "Residents",
        
        data() {

            return {
                
                residents: {},
                loading: false,
                count: {
                    residents:0,
                    abonents:0,
                },
                
                
                
            }
        },


        
        mounted() {
            document.title = "КСУ Количество абонентов и жильцов"
            this.getResidents();
        },


        methods: {
            
            getResidents(){
                this.loading = true
                this.count = {
                    residents:0,
                    abonents:0
                }
                var user = this.$store.state.auth.user
                if(this.$store.state.auth.user.session.staff.full_access === 1){
                    this.$store.dispatch('reports/Residents', user.session.client.key).then(
                        (residents) => {
                            
                            this.residents = residents.data
                            for(let index = 0; index < this.residents.length; index++){
                                this.count.residents += parseInt(this.residents[index].residents)
                                this.count.abonents += parseInt(this.residents[index].abonents)
                            }
                            console.log(this.count)
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
                    let branch = this.$store.state.auth.user.session.branch.id
                    this.$store.dispatch('reports/ResidentsBranch', {key:user.session.client.key, branch: branch}).then(
                        (residents) => {
                            
                            this.residents = residents.data
                            for(let index = 0; index < this.residents.length; index++){
                                this.count.residents += parseInt(this.residents[index].residents)
                                
                                
                                this.count.abonents += parseInt(this.residents[index].abonents)
                            }
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