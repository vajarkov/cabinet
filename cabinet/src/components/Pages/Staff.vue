<template>
    <div>
        <div style="display:flex"> 
        
            <v-date-picker class="inline-block h-full" v-model="date" >
                <template v-slot="{ inputValue, togglePopover }" tabindex="0" >
                    <div class="flex items-center">
                        <button 
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
     
            <select v-model="marker" class="form-select form-select-lg mb-3" @change="addMarker($event)" aria-label=".form-select-lg example" style="width:220px;" aria-placeholder="Выберите сотрудника" >
                <option  disabled value="">Выберите мастера...</option>
                <option  v-for="phone in mobile" :key="phone.id" :value="phone" >{{phone.NAME}}</option>
            </select>
            <button style="height:48px; align:center" @click="reportView">Поучить данные</button>
        </div>
        <div>
            <l-map id="map" style="height:50vh; width:75%" ref="map" v-model:zoom="zoom" :center="[43.238482,76.944987]">
                <l-tile-layer 
                    url="https:////{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                ></l-tile-layer>
                <l-polyline v-if="Object.keys(distance).length !== 0" :lat-lngs="distance" color="green"></l-polyline>
               
                <!-- <l-polygon v-if="Object.keys(distance).length !== 0" :lat-lngs="distance"></l-polygon> -->
                <l-marker v-if="Object.keys(marker).length !== 0" :lat-lng="marker.location" :title="marker.NAME">
                    <l-tooltip v-if="Object.keys(marker).length !== 0">{{ marker.NAME }}</l-tooltip>
                     
                </l-marker> 
                <l-geo-json :geojson="geojson" :options="geojsonOptions" />
            </l-map>
             
      </div>
      
    
        
    </div>
    <div v-if="Object.keys(marker).length !== 0" style="diplay:block;margin-top:50vh">
        
          <h2>Мастер</h2>
          <h2>{{ marker.NAME }}</h2>
          <h4>Дата последней регистрации</h4>
          <h4>{{ marker.stamp }}</h4>
          <h4>Пройденное расстояние за {{ date.toString() }}</h4>
          <h4>{{ data.distance }} км</h4>
          <h4>Время в пути</h4>
          <h4>{{ timePeriod.toFixed(2) }} мин.</h4>
    </div>
     <div v-else style="diplay:block;margin-top:50vh">
        <h3>Выберите мастера</h3>         
    </div> 
      
   
</template>

<script>

    import "leaflet/dist/leaflet.css"
    import {    LTooltip, 
                LMap, 
                LGeoJson, 
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
                geojsonOptions: {
                    // Options that don't rely on Leaflet methods.
                },
            }
        }, 
         components: {
                LMap,
                LGeoJson,
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
                        console.log(data)
                        this.mobile = data.phones
                        this.mobile.forEach(phone => {
                            let location = ([phone.ltd,phone.lng])
                            phone.location = location
                        
                        },
                        () =>{

                            console.log("error")
                        })
                         
                        console.log(this.mobile)
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
                    {   console.log(data)
                        this.data = data
                        this.data.detail.forEach(item => {
                        console.log(item)
                        this.distance.push([parseFloat(item.coord.ltd), parseFloat(item.coord.lng)]);
                        if(item.action === "MOVE")
                            this.timePeriod += item.period;
                        
                        })
                    },
                    () => {
                        alert("Данных за выбранное число нет в базе")
                        console.log("error")
                        }
                    )
                
                this.loading = false
            },
        },    
                
                    
                
            
        
        mounted() {
            document.title = "КСУ Отчет по мастерам"
            
            this.initMarkers();
            
         },
    }


</script>

<style scoped>
.vc-popover-content-wrapper .is-interactive {
    position: fixed;
    top: auto;
    z-index: 2000!important;
}

.leaflet-container {
    position: fixed;
}

</style>