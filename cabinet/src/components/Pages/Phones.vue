<template>
    <div>
        <div v-show="Object.keys(phones).length!==0">
            <table class="table table-hover table-bordered"> 
                    <thead class="text-light text-center" style="background:#276595;">
                        <th scope="col">Номер</th>
                        <th scope="col">Пароль</th>
                       
                    </thead>
                    <tbody v-for="phone in phones" :key="phone.id">
                        <tr>
                            <th scope="row">{{ phone.phone }}</th>
                            <td>{{ phone.p }}</td>
                            
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
        name: "Phones",
        
        data() {

            return {
                
                phones: {},
                loading: false,
                
                
                
            }
        },


        
        mounted() {
            document.title = "КСУ Пароли"
            this.getPhones();
        },


        methods: {
            getPhones(){
                this.loading = true
                var user = this.$store.state.auth.user
                console.log(user)
                this.$store.dispatch('reports/Phones', user.session.client.key).then(
                        (phones) => {
                            
                            this.phones = phones.phones
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