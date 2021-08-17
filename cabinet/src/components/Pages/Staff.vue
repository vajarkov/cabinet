<template>
    <div class="card mx-0 py-0 px-0 my-0">
        <div class="card-header d-flex">
            <v-date-picker class="inline-block h-full" @change="clearData()" v-model="date" >
                <template v-slot="{ inputValue, togglePopover }" tabindex="0" >
                    <div class="flex items-center">
                        <button 
                            data-container="body"
                            @click="togglePopover()">
                            <i class="bi bi-clock"></i>
                        </button>
                        <input
                            :value="inputValue"
                            
                            class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r rounded-3 focus:outline-none focus:border-blue-500"
                            readonly
                        />
                    </div>
                </template>
            </v-date-picker>
            
            <select v-model="marker" class="form-select form-select-sm mx-2" @change="addMarker($event)" aria-label=".form-select-sm example" 
            style="width:220px;" aria-placeholder="Выберите сотрудника" >
                <option  disabled value="">Выберите мастера...</option>
                <option  v-for="phone in mobile" :key="phone.id" :value="phone" >{{phone.NAME}}</option>
            </select>
            
            <button  class="mx-5 w-25 text-light bg-primary rounded" style="align:center" @click="reportView">Поучить данные</button>
        </div>

        <div class="card-body mx-0 my-0 px-0 py-0">
            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col-sm-8 mx-0 pe-0">
                    <l-map id="map" style="height:50vh" ref="map" v-model:zoom="zoom" :center="[43.238482,76.944987]">
                        <l-tile-layer 
                            url="https:////{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            layer-type="base"
                            name="OpenStreetMap"
                        ></l-tile-layer>
                        <l-polyline v-if="Object.keys(distance).length !== 0" :lat-lngs="distance" color="green" />
                        <l-marker v-if="Object.keys(marker).length !== 0" :lat-lng="marker.location" :title="marker.NAME">
                            <l-tooltip v-if="Object.keys(marker).length !== 0">{{ marker.NAME }}</l-tooltip>
                        </l-marker> 
                    </l-map>
                </div>
                
                <div class="col-sm-4 mx-0 ps-0" v-if="Object.keys(marker).length !== 0" >
                    <div class="card px-0 mx-0 my-0 py-0 h-100">
                        <div class="card-header my-0 mx-0 text-center bg-primary">
                            <i class="text-light fs-4">{{ marker.NAME }}</i>
                            <p class="text-light">{{ marker.stamp.toLocaleString() }}</p>
                        </div>
                        <div class="card-body">
                            <p class="text-primary fs-4 text-center">Пройденное расстояние за {{ date.toLocaleString().slice(0,10) }}</p>
                            <p class="text-primary fs-3 text-center">{{ data.distance }} км</p>
                            <p class="text-primary fs-4 text-center">Время в пути</p>
                            <p class="text-primary fs-3 text-center">{{ timePeriod.toFixed(2) }} мин.</p>
                        </div>
                    </div>
                            
                        </div>
                        <div v-else>
                            <p class="text-info text-center">Выберите мастера</p>
                        </div>
                
                

            </div>
            
        </div>
    </div>
   
</template>

<script>

    import "leaflet/dist/leaflet.css"
    import {    LTooltip, 
                LMap, 
                
                LTileLayer,
                LMarker, 
                LPolyline,
                //LPolygon
                } 
                from "@vue-leaflet/vue-leaflet";
    
    export default {
        name: "Staff",
        data( ) {
            return {
               
                mobile: {},
                zoom:11,
                date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                marker: {},
                data:{},
                distance:[],
                timePeriod:0,
                geojson: null,
               
            }
        }, 
         components: {
                LMap,
                
                LTileLayer,
                LMarker,
                LTooltip,
                LPolyline,
               // LPolygon
        },
        methods: {

             initMarkers(){
                this.loading = true
                var user = this.$store.state.auth.user
                this.$store.dispatch('reports/Mobile', user.session.client.key).then(
                     (data) => {
                        //console.log(data)
                        this.mobile = data.phones
                        this.mobile.forEach(phone => {
                            let location = ([phone.ltd,phone.lng])
                            phone.location = location
                        
                        },
                        () =>{

                            console.log("error")
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
                        this.loading = false;
                        console.log(this.message)
                        }

                 )
            },


            addMarker(){
                this.clearData();
                
            },

            clearData(){
                this.timePeriod = 0
                this.data.distance = 0
                while(this.distance.length)
                {
                    this.distance.pop();
                }
                this.distance.length = 0;
            },
            reportView(){
                
                this.loading = true
                var user = this.$store.state.auth.user
                var date = Math.round(this.date.getTime())
                var id = this.marker.id
                this.clearData();
                this.$store.dispatch('reports/ReportView', {key:user.session.client.key, date:date, id:id}).then(
                    (data) => 
                    {   //console.log(data)
                        this.data = data
                        this.data.detail.forEach(item => {
                        console.log(item)
                        this.distance.push([parseFloat(item.coord.ltd), parseFloat(item.coord.lng)]);
                        if(item.action === "MOVE")
                            this.timePeriod += item.period;
                        
                        })
                    },
                    (error) => {
                        alert("Данных за выбранное число нет в базе")
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
                
                this.loading = false
            },
        },    
                
                    
                
            
        
        mounted() {
            document.title = "КСУ Отчет по мастерам"
            
            this.initMarkers();
            
         },

        watch: {
            date: function() {
                this.clearData();
            }
        }
    }


</script>

<style scoped>


.leaflet-container {
    z-index:1;
} 

</style>