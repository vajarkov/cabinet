<template>
    <div>
        <h2>Dashboard</h2>
        <h3>Со вчера</h3>
        <h4>{{ yesterday }}</h4>
        <br>
        <h3>Принято</h3>
        <h4>{{ countByStatus.c }}</h4>
        <br>
        <h3>Обработано</h3>
        <h4>{{ countByStatus.c2 }}</h4>
        <br>
        <h3>Просрочено</h3>
        <h4>{{ countByStatus.c3 }}</h4>


        <div>
            <l-map style="height:50vh" ref="map" v-model:zoom="zoom" :center="[43.238482,76.944987]">
                <l-tile-layer 
                    url="https:////{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                ></l-tile-layer>
                <l-marker  :lat-lng="[43.238482,76.944987]"></l-marker>
                <l-geo-json :geojson="geojson" :options="geojsonOptions" />
            </l-map>
        </div>
        <br>
        <div v-for="org in countByOrg" :key="org.name">
            <div>
                <h3>{{org.name}}</h3>
                <h4>Новые: {{ org.incoming }}</h4>
                <h4>В работе: {{ org.work }}</h4>
                <h4>Выполненые: {{ org.done }}</h4>
                <h4>Отклоненные: {{ org.rejected }}</h4>
            </div>
        </div>
        <br>
        <div>

            
            {{ countByStaff }}
        </div>
        <br>
        <div v-for="staff in countByStaff" :key="staff.id">
            <div>
                <h3>{{staff.name}}</h3>
                <p>{{ (staff.done * 100 / (staff.work + staff.done)).toFixed(2) }}% выполнил, и {{ (staff.done * 100 / countByStatus.c2).toFixed(2) }} % от Обработанных</p>
                
            </div>
        </div>
        <br>
        <div>
            {{ mobile }}
        </div>
        <br>
        

    </div>
</template>

<script>
    import "leaflet/dist/leaflet.css"
    import { LMap, LGeoJson, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
//{s}.tile.openstreetmap.org

//tilessputnik.ru
//https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/
    export default {
        name: "Dashboard",
        components: {
            
                LMap,
                LGeoJson,
                LTileLayer,
                LMarker
        },

        data() {
            return {
                loading: false,
                zoom:11,
                yesterday: 0,
                countByStatus: {},
                countByOrg: {},
                countByStaff: {},
                mobile: {},
                geojson: null,
                geojsonOptions: {
                    // Options that don't rely on Leaflet methods.
                },
            }
        },

        async beforeMount() {
            // HERE is where to load Leaflet components!
            const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

            // And now the Leaflet circleMarker function can be used by the options:
            this.geojsonOptions.pointToLayer = (feature, latLng) =>
            circleMarker(latLng, { radius: 8 });
            this.mapIsReady = true;
        },

         methods: {
             async hadndleData(){
                 this.loading = true
                 var user = this.$store.state.auth.user
                 console.log(user)
                 this.$store.dispatch('dashboard/yesterday', user.session.client.key).then(
                     (data) => {
                         console.log(data)
                         this.yesterday = data.allCount
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
                 this.$store.dispatch('dashboard/countByStatus', user.session.client.key).then(
                    (data) => {
                         console.log(data)
                         this.countByStatus = data.count
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

                 this.$store.dispatch('dashboard/countByOrg', user.session.client.key).then(
                    (data) => {
                         console.log(data)
                         this.countByOrg = data.items
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

                 this.$store.dispatch('dashboard/countByStaff', user.session.client.key).then(
                     (data) => {
                         console.log(data)
                         this.countByStaff = data.data
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


                 this.$store.dispatch('dashboard/Mobile', user.session.client.key).then(
                     (data) => {
                         console.log(data)
                         this.mobile = data.phones
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
             }
         },

        mounted() {
            document.title = "КСУ Доска"
            this.hadndleData();
            
         },
         
    }
</script>

<style scoped>

</style>