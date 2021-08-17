<template>
    <div>
        <i class="fs-1 bi-journal-bookmark-fill"></i><span class="fs-3 ms-1 d-none d-lg-inline">Отчеты</span>
        <div style="display:flex">
            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/staff" class="nav-link text-truncate">
                                <i class="fs-6 bi-journal-bookmark-fill"></i><span class="ms-2 d-none d-sm-inline">Сотрудники</span>
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть и проверить, </small></p>
                            <ul>
                                <li><small>Перемешение сотрудника на карте</small></li>
                                <li><small>Объем выполняемых задач</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/requests" class="nav-link text-truncate">
                                <i class="fs-6 bi-journal-bookmark-fill"></i><span class="ms-2 d-none d-sm-inline">Заявки</span>
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть и проверить,</small></p>
                            <ul>
                                <li><small>Выполнение заявок в срезе по времени</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/payments" class="nav-link text-truncate">
                                <i class="fs-6 bi-journal-bookmark-fill"></i><span class="ms-2 d-none d-sm-inline">Оплаты</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть и проверить,</small></p>
                            <ul>
                                <li><small>Поступление платежей и начислений в срезе по времени</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/pastdue" class="nav-link text-truncate">
                                <i class="fs-6 bi-journal-bookmark-fill"></i><span class="ms-2 d-none d-sm-inline">Просроченные заявки</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть посмотреть</small></p>
                            <ul>
                                <li><small>список просроченных заявок</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "Reports",
        mounted() {
            document.title = "КСУ Отчеты"
        }
    }
</script>

<style scoped>

</style>