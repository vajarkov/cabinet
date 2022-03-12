<template>
    <div>
        <i class="fs-1 bi-laptop"></i><span class="fs-3 ms-1 d-none d-lg-inline">Монтажи</span>
        <div class="row row-cols-1 row-cols-md-4 g-4">
            <div class="col">
                <div v-show="Object.keys(countByStatus).length!==0" class="card mb-3 mx-0 py-0">
                    <div class="row g-0">
                        <div class="col-md-2">
                            <i class="fs-1 bi-box-arrow-in-left"></i>
                        </div>
                        <div class="col-md-10">
                            <div  class="card-body">
                                <p class="card-title">Со вчера</p>
                                <h4 class="card-text">{{ yesterday }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div v-show="Object.keys(countByStatus).length!==0" class="card mb-3 mx-0 py-0">
                    <div class="row g-0">
                        <div class="col-md-2">
                            <i class="fs-1 bi-box-arrow-in-up-left" style="color: rgb(105, 168, 224);"></i>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <p class="card-title">Принято</p>
                                <h4 class="card-text">{{ countByStatus.c }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div v-show="Object.keys(countByStatus).length!==0" class="card mb-3 mx-0 py-0">
                    <div class="row g-0">
                        <div class="col-md-2">
                            <i class="fs-1 bi-check2-circle" style="color: rgb(136, 239, 45);"></i>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <p class="card-title">Обработано</p>
                                <h4 class="card-text">{{ countByStatus.c2 }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div v-show="Object.keys(countByStatus).length!==0" class="card mb-3 mx-0 py-0">
                    <router-link class="text-decoration-none text-dark" to="/reports/pastduemontage">
                        <div class="row g-0">
                            <div class="col-md-2">
                                <i class="fs-1 bi-clock" style="color: rgb(193, 52, 52);"></i>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <p class="card-title">Просрочено</p>
                                    <h4 class="card-text">{{ countByStatus.c3 }}</h4>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="col-sm-8">
                <div v-show="Object.keys(mobile).length!==0" class="card px-0 py-0 mx-0 my-0">
                    <div class="card-header mx-0 my-0">Мастера онлайн</div>
                    <div class="card-body mx-0 my-0 px-0 py-0">
                        <l-map style="height:470px" ref="map" v-model:zoom="zoom" :center="center">
                            <l-tile-layer 
                                url="https:////{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                layer-type="base"
                                name="OpenStreetMap"
                            ></l-tile-layer>
                            <l-marker  v-for="phone in mobile" :key="phone.id" :lat-lng="phone.location" :title="phone.NAME">
                                <l-tooltip>{{ phone.NAME }}</l-tooltip>
                                
                            </l-marker>
                            
                        </l-map>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div v-show="Object.keys(countByStaff).length!==0" class="card px-0 py-0 mx-0 my-0">
                    
                    <div class="card-header mx-0 my-0">Планы мастеров</div>
                    <div class="card-body scroll mx-0 my-0">
                        <div v-for="staff in countByStaff" :key="staff.id">

                            <b>{{staff.name}}</b>
                            <p class="my-0">Выполнил {{ staff.done }} из {{ (parseInt(staff.work) + parseInt(staff.done)) }}</p>
                            <p v-bind:style="[(Date.now() - Date.parse(staff.stamp)) > (3* 3600 * 1000) ? {'background-color': 'red'}:{'background-color': '#f8f9fa'} ]">Время последней заявки: {{staff.stamp}}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="Object.keys(countByBranch).length!==0" class="col-sm-4" v-for="branch in countByBranch" :key="branch.name">
                <div class="card px-0 py-0 mx-0 my-0">
                    <div >
                        <div class="card-header">{{branch.name}}</div>
                        <div class="card-body">
                            <router-link class="text-decoration-none text-dark" :to="{ name: 'montagesStatus' , params:  { branch_id: branch.id, status_id: 1, name: branch.name, status: 'Новые заявки' }}">
                                <i class="fs-5 bi-box-arrow-in-up-left p-1" style="color:#0f9379;" data-bs-toggle="tooltip" title="Новые заявки"></i><span class="fs-5">{{ branch.incoming }}</span>
                            </router-link>
                            <router-link class="text-decoration-none text-dark" :to="{ name: 'montagesStatus' , params:  { branch_id: branch.id, status_id: 2, name: branch.name, status: 'В работе' }}"> 
                                <i class="fs-5 bi-gear p-1" style="color:#f6bf62;" data-bs-toggle="tooltip" title="В работе"></i><span class="fs-5">{{ branch.work }}</span>
                            </router-link>
                            <router-link class="text-decoration-none text-dark" :to="{ name: 'montagesStatus' , params:  { branch_id: branch.id, status_id: 3, name: branch.name, status: 'Выполненные заявки'}}">
                                <i class="fs-5 bi-check2-circle p-1" style="color: rgb(192, 192, 192);" data-bs-toggle="tooltip" title="Выполненные"></i><span class="fs-5">{{ branch.done }}</span>
                            </router-link>
                            
                            <router-link class="text-decoration-none text-dark" :to="{ name: 'montagesStatus' , params:  { branch_id: branch.id, status_id: 5, name: branch.name, status: 'Отложенные заявки' }}">
                                <i class="fs-5 bi-reply p-1" data-bs-toggle="tooltip" title="Отложенные"></i><span class="fs-5">{{ branch.rejected }}</span>
                            </router-link>
                            <i class='fs-5 bi-box-arrow-in-left p-1' style='color:#da1631;' data-bs-toggle="tooltip" data-bs-html="true" title="Со вчера"></i><span class="fs-5">{{ branch.yesterday }}</span>
                            <i class='fs-5 bi-clock p-1' style='color:#da1631;' data-bs-toggle="tooltip" data-bs-html="true" title="Со вчера"></i><span class="fs-5">{{ branch.pastdue }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='backdrop' v-show="counter!==0">    
            <div class='overlay' >
                <div class="spinner-grow text-primary"  style='width:3rem;height:3rem;justify-content:center;align-items:center;' role="status">
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
    import "leaflet/dist/leaflet.css"
    import {  LTooltip,LMap,  LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";


    export default {
        name: "Montage",
        components: {
                LMap,
                
                LTileLayer,
                LMarker,
                LTooltip
        },

        data() {
            return {
                loading: false,
                zoom:11,
                yesterday: 0,
                counter: 0,
                countByStatus: {},
                countByBranch: {},
                countByStaff: {},
                mobile: {},
                geojson: null,
                start: false,
                center: [],
                full_access: 0,
                //orderOrg: [1,16,71,73, 52,70, 7,72, 74, 75],
                orderedOrg: {},
            }
        },

     

         methods: {
           
            async initMarkers(){
                this.counter ++
                var user = this.$store.state.auth.user
                if(this.full_access === 1){
                    await this.$store.dispatch('montage/Mobile', user.session.client.key).then(
                        (data) => {
                            this.mobile = data.phones
                            this.mobile.forEach(phone => {
                                let location = ([phone.ltd,phone.lng])
                                phone.location = location
                                
                                },
                                (error) =>{
                                    this.message =
                                    (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                                
                                }
                            )
                            this.counter --
                            
                        },
                        (error) => {
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                            this.counter --
                            }

                    )
                } else {
                    let branch = this.$store.state.auth.user.session.branch.id
                    await this.$store.dispatch('montage/MobileBranch', {key:user.session.client.key, branch: branch}).then(
                     (data) => {
                        this.mobile = data.phones
                        this.mobile.forEach(phone => {
                            let location = ([phone.ltd,phone.lng])
                            phone.location = location
                            
                            },
                            (error) =>{
                                this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                               
                            }
                        )
                        this.counter --
                        
                     },
                     (error) => {
                        this.message =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                        this.successful = false;
                        this.counter --
                        }

                    )
                }
            },
            async getYesterday(){
                this.counter ++
                var user = this.$store.state.auth.user
                if(this.full_access === 1){
                    await this.$store.dispatch('montage/yesterday', user.session.client.key).then(
                        (data) => {

                            this.yesterday = data.allCount
                            this.counter --
                        },
                        (error) => {
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                            this.counter -- 
                        }
                    )

                }
                else{
                    await this.$store.dispatch('montage/yesterdayByBranch', user.session.client.key).then(
                    (data) => {
                        this.yesterday = data.allCount
                        this.counter --
                    },
                     (error) => {
                        this.message =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                        this.successful = false;
                        this.counter -- 
                        }
                )

                }
            },
            

            
            async getCountByStatus(){
                //this.loading = true
                this.counter ++
                var user = this.$store.state.auth.user
                if(this.full_access === 1){
                    await this.$store.dispatch('montage/countByStatus', user.session.client.key).then(
                        (data) => {
                            this.countByStatus = data.count
                            this.counter --
                            
                        },
                        (error) => {
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                                this.successful = false;
                                this.counter --
                            }

                    )
                } else {
                   await this.$store.dispatch('montage/countByStatusBranch', user.session.client.key).then(
                        (data) => {
                            this.countByStatus = data.count
                            this.counter --
                        },
                        (error) => {
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                                this.successful = false;
                                this.counter --
                            }

                    )
                }
                
            },
            async getCountByBranch(){
                //this.counter ++
                var user = this.$store.state.auth.user
                if(this.full_access === 1){
                    await this.$store.dispatch('montage/countByBranch', user.session.client.key).then(
                        (data) => {
                            console.log()
                            this.countByBranch = data.items
                            console.log(this.countByBranch);
                            //this.mapOrder(this.countByBranch, this.orderOrg, "id")
                            //this.counter --
                            
                        },
                        (error) => {
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                            //this.counter --
                            }

                    )
                }else{
                        await this.$store.dispatch('montage/countByBranchBranch', user.session.client.key).then(
                        (data) => {
                            this.countByBranch = data.items
                            //this.counter --
                            
                        },
                        (error) => {
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                            //this.counter --
                            }

                    )
                }

            },

            // async mapOrder (array, order, key) {
  
            //     array.sort( function (a, b) {
            //         var A = a[key], B = b[key];
    
            //         if (order.indexOf(A) > order.indexOf(B)) {
            //             return 1;
            //         } else {
            //             return -1;
            //         }
    
            //     });
  
            //     return array;
            // },

            async getCountByStaff(){
                var user = this.$store.state.auth.user
                this.counter ++
                 if(this.full_access === 1){
                    await this.$store.dispatch('montage/countByStaff', user.session.client.key).then(
                        (data) => {

                            this.countByStaff = data.data
                            
                            this.counter --
                            
                        },
                        (error) => {
                            this.message =
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                            
                            this.counter --
                        }

                    )
                 }else {
                    let branch = this.$store.state.auth.user.session.branch.id
                    await this.$store.dispatch('montage/countByStaffBranch', {key: user.session.client.key, branch: branch  }).then(
                    (data) => {
                        this.countByStaff = data.data
                        this.counter --
                        
                    },
                     (error) => {
                        this.message =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                        this.successful = false;
                        
                        this.counter --
                    }

                 )

                 }

                
                 
            }
        },
        

        beforeMount() {
            
            switch(this.$store.state.auth.user.session.branch.id){
                case 4:
                case 5:{
                    this.center = [43.238482, 76.944987]
                    break;
                }
                case 13:
                case 14: {
                    this.center = [51.13333, 71.4333]
                    break;
                }
                case 37:
                case 38:
                case 40:{
                    this.center = [52.3156, 76.9564]
                    break
                }
                case 41:
                case 43:
                case 44: {
                    this.center = [51.7298, 75.3266]
                    break
                }
                case 45:
                case 46: {
                    this.center = [42.3000, 69.6000]
                    break
                }
                default:
                    {
                        break;
                    }
            }
            this.full_access = this.$store.state.auth.user.session.staff.full_access 
            
        },
        mounted() {
            document.title = "КСУ Монтажи"
            setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);
            
            
                this.getYesterday();
                this.getCountByStatus();
                this.getCountByBranch();
                this.getCountByStaff();
                this.initMarkers();
            
         },
         
    }
</script>

<style scoped>
.scroll {
    max-height: 470px;
    overflow-y: auto;
}

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