<template>
    
        <div class="card mx-0 py-0 px-0 my-0">
                    
                    <div class="card-header d-flex">
                            <v-date-picker v-model="range" is-range>
                            <template v-slot="{ inputValue, inputEvents }">
                                <div class="flex justify-center items-center">
                                    <input
                                        :value="inputValue.start"
                                        v-on="inputEvents.start"
                                        class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                                    />
                                    <svg
                                        fill="none"
                                        class="w-4 h-4 mx-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                    <input
                                        :value="inputValue.end"
                                        v-on="inputEvents.end"
                                        class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                                    />
                                </div>
                            </template>
                        </v-date-picker>
                        <select v-model="branch" class="form-select form-select-sm mx-2" aria-label=".form-select-sm example" 
                            style="width:220px;" aria-placeholder="Выберите сотрудника" >
                            <option  disabled value="" selected>Выберите подразделение...</option>
                            <option  v-for="branch in branches" :key="branch.id" :value="branch" >{{branch.name}}</option>
                        </select>
                    
                        <button class="mx-5 w-25 text-light"  style="background:#276595;align:center;position: absolute; right: 0;height:30px;" @click="getTypes()">Получить данные</button>
                    </div>
                    <div class="card-body px-0 py-0 my-0">
                        <table class="table table-hover table-bordered"> 
                                <thead class="text-light text-center" style="background:#276595;">
                                    <th scope="col">Категория</th>
                                    <th scope="col">Кол-во</th>
                                    
                                </thead>
                                <tbody v-for="type in types" :key="type.id">
                                    <tr>
                                        <td>{{ type.name }}</td>
                                        <th scope="row">{{ type.count }}</th>
                                        
                                        
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            
        
</template>

<script>
    export default {
        name: "RequestTypes",
        data() {
            return {
                requests:{},
                range: {
                    start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date(1)),
                    end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                },
                branches:[{id:"0", name: "Все"}],
                branch: {},
                types: {},
                
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
       
            
            async getTypes(){
                if (Object.keys(this.branch).length === 0){
                    alert('Выберите подразделение')
                    return 
                }
                this.loading = true
                var user = this.$store.state.auth.user
                var startDate = this.range.start.getFullYear() + '-' + ('0' + (this.range.start.getMonth() + 1)).slice(-2) + '-' + ('0' + this.range.start.getDate()).slice(-2)
                var endDate = this.range.end.getFullYear() + '-' + ('0' + (this.range.end.getMonth() + 1)).slice(-2) + '-' + ('0' + this.range.end.getDate()).slice(-2)
                if(this.$store.state.auth.user.session.staff.full_access === 1){
                    if (this.branch.id == 0){
                        this.$store.dispatch('reports/Types', {end:endDate, start:startDate ,key:user.session.client.key}).then(
                        (types) => {
                            
                            this.types = types.data
                            
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
                    } else {
                         this.$store.dispatch('reports/TypesBranch', {end:endDate, start:startDate, key:user.session.client.key, branch: this.branch.id}).then(
                        (types) => {
                            
                            this.types = types.data
                            
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
                    }
                    
                } else {
                   
                   if (this.branch.id == 0){
                            this.$store.dispatch('reports/TypesBranches', {end:endDate, start:startDate, key:user.session.client.key, branch: this.$store.state.auth.user.session.branch.id}).then(
                            (types) => {
                                this.types = types.data
                                
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
                    } else {
                         this.$store.dispatch('reports/TypesBranch', {end:endDate, start:startDate, key:user.session.client.key, branch: this.branch.id}).then(
                        (types) => {
                            this.types = types.data
                            
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
                    }
                }
            },
        }, 
        mounted() {
            document.title = "КСУ Заявки по категориям"
                        
         },
         beforeMount(){
             this.getBranches()

         },

         
    }
</script>

<style scoped>
.small {
    max-width: 600px;
    margin:  150px auto;
  }
.chart {
  height: 400px;
}
.w-32 {
    width: 8rem;
}
.px-2 {
    padding-left: .5rem;
    padding-right: .5rem;
}
.py-1 {
    padding-top: .25rem;
    padding-bottom: .25rem;
}
.border {
    border-width: 1px;
}
.rounded {
    border-radius: .25rem;
}
button, input, optgroup, select, textarea {
    padding: 0;
    line-height: inherit;
    color: inherit;
}
button, input {
    overflow: visible;
}
button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
}
* {
    border-radius: 0;
}
*, :after, :before {
    box-sizing: border-box;
    border: 0 solid #e2e8f0;
}

input {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 2px;
    border-width: 2px;
    border-style: inset;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
}
.example, .example-home {
    margin: 1rem -1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247,250,252,var(--bg-opacity));
    border-top-width: 1px;
    border-bottom-width: 1px;
}
.text-gray-700 {
    --text-opacity: 1;
    color: #4a5568;
    color: rgba(74,85,104,var(--text-opacity));
}
html {
    font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    line-height: 1.5;
}
html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
}

.w-4 {
    width:1rem;
}
.h-4 {
    height:1rem;
}
.mx-2 {
    margin-left:0.5rem;
    margin-right:0.5rem;
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