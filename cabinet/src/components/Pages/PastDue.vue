<template>
    <div>
        <vue-table-lite 
            :is-loading="loading"  
            :rows="pastdue.pastdue" 
            :messages="messages" 
            :sortable="sortable" 
            :columns="fields" />
    </div>
</template>

<script>
    import VueTableLite from 'vue3-table-lite'
     
    export default {
        name: "PastDue",
        components:{
            VueTableLite, 
        },
        data() {

            return {
                columns:[
                    {
                        prop: 'numdoc',
                        name: 'Номер',
                        //sortable: true,
                    },
                    { 
                        prop: 'datedoc',
                        name: 'Дата',
                        //sortable: true
                    },
                    {
                        prop: 'address',
                        name: 'Адрес',
                        //sortable: true,
                    },
                    {
                        prop: 'cmnt',
                        name: 'Комментарий',
                        //sortable: true,
                    }
                ]
                
                ,
                fields: [
                    {
                        field: 'numdoc',
                        label: 'Номер',
                        sortable: true,
                        isKey: true,
                    },
                    { 
                        field: 'datedoc',
                        label: 'Дата',
                        sortable: true
                    },
                    {
                        field: 'address',
                        label: 'Адрес',
                        sortable: true,
                    },
                    {
                        field: 'cmnt',
                        label: 'Комментарий',
                        sortable: true,
                    }
                ],
                pastdue: {},
                loading: false,
                sortable: {
                    order: "numdoc",
                    sort: "asc",
                },
                messages: {
                    pagingInfo: "Показаны {0}-{1} of {2}",
                    pageSizeChangeLabel: "Количество записей:",
                    gotoPageLabel: "Перейти на страницу:",
                    noDataAvailable: "Нет данных",
                },
                
                
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
                this.$store.dispatch('reports/pastDue', user.session.client.key).then(
                    (pastdue) => {
                        this.pastdue = pastdue
                        this.loading = false
                    },
                    (error) => {
                        //alert("Данных за выбранное число нет в базе")
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

</style>