<template>
    <div>
        <h2>Reports</h2>
        <router-link  to="/reports/staff" class="nav-link text-truncate">
                    <i class="fs-5 bi-journal-bookmark-fill"></i><span class="ms-1 d-none d-sm-inline">Сотрудники</span> 

        </router-link>
       
        <button>
            Заявки
        </button>
        <button>
            Оплаты
        </button>
        <button>
            Просроченные заявки
        </button>

    </div>
</template>

<script>
    export default {
        name: "Reports"
    }
</script>

<style scoped>

</style>