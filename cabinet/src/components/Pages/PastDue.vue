<template>
    <div>
        <b-table v-show="postdue"  sticky-header striped hover :items="postdue" :fields="fields"></b-table>
    </div>
</template>

<script>
    export default {
        name: "PastDue",
        data() {
            return {
                fields: [
                    {
                        key: 'numdoc',
                        label: 'Номер',
                        sortable: true,
                    },
                    { 
                        key: 'datedoc',
                        label: 'Дата',
                        sortable: true
                    },
                    {
                        key: 'address',
                        label: 'Адрес',
                        sortable: true,
                    },
                    {
                        key: 'cmnt',
                        label: 'Комментарий',
                        sortable: true,
                    }
                ],
                pastdue: {},
                loading: false
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
                        console.log(pastdue)
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
            }
        }



    }
</script>

<style lang="scss" scoped>

</style>