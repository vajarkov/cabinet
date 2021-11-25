<template>
    <div>
        <i class="fs-1 bi-journal-bookmark-fill"></i><span class="fs-3 ms-1 d-none d-lg-inline">Отчеты</span>
        <div style="display:flex">
            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/staff" class="nav-link text-truncate">
                                <i class="fs-5 bi-people-fill" data-bs-toggle="tooltip" title="Сотрудники"></i><span class="ms-2 d-sm-inline">Сотрудники</span>
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
                                <i class="fs-5 bi-card-checklist" data-bs-toggle="tooltip" title="Заявки"></i><span class="ms-2 d-sm-inline">Заявки</span>
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
                                <i class="fs-5 bi-cash-coin" data-bs-toggle="tooltip" title="Платежи"></i><span class="ms-2 d-sm-inline">Оплаты</span> 
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
                                <i class="fs-5 bi-clock" data-bs-toggle="tooltip" title="Просроченные заявки"></i><span class="ms-2 d-sm-inline">Просроченные заявки</span> 
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

                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/repeat" class="nav-link text-truncate">
                                <i class="fs-5 bi-arrow-repeat" data-bs-toggle="tooltip" title="Повторяющиеся заявки"></i><span class="ms-2 d-sm-inline">Повторяющиеся заявки</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть посмотреть</small></p>
                            <ul>
                                <li><small>список абонентов, которые за выбранный период обращались несколько раз</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/types" class="nav-link text-truncate">
                                <i class="fs-5 bi-ui-checks" data-bs-toggle="tooltip" title="Категории"></i><span class="ms-2 d-sm-inline">Категории</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть посмотреть</small></p>
                            <ul>
                                <li><small>количество заявок по разным категориям</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/nomenclatura" class="nav-link text-truncate">
                                <i class="fs-5 bi-cart-check" data-bs-toggle="tooltip" title="Списание"></i><span class="ms-2 d-sm-inline">Списание</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть посмотреть</small></p>
                            <ul>
                                <li><small>материал, списанный мастерами при выполнении заявок</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/residents" class="nav-link text-truncate">
                                <i class="fs-5 bi-building" data-bs-toggle="tooltip" title="Количество абонентов"></i><span class="ms-2 d-sm-inline">Количество абонентов</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть посмотреть</small></p>
                            <ul>
                                <li><small>Количество абонентов по филиалам и общее количество жильцов в домах, которые обслуживаются филиалом</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/phones" class="nav-link text-truncate">
                                <i class="fs-5 bi-key" data-bs-toggle="tooltip" title="Пароли"></i><span class="ms-2 d-sm-inline">Пароли</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть посмотреть</small></p>
                            <ul>
                                <li><small>телефоны зарегистрированных сервисников, со сгенерированными паролями</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/debtors" class="nav-link text-truncate">
                                <i class="fs-5 bi-calendar-x" data-bs-toggle="tooltip" title="Неплательщики"></i><span class="ms-2 d-sm-inline">Неплательщики (подъезды)</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть посмотреть</small></p>
                            <ul>
                                <li><small>количество неплательщиков по подъездам</small></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card px-0 mx-0 py-0 h-75">
                        <div class="card-header">
                            <router-link  to="/reports/debtorslist" class="nav-link text-truncate">
                                <i class="fs-5 bi-calendar-x" data-bs-toggle="tooltip" title="Неплательщики"></i><span class="ms-2 d-sm-inline">Неплательщики (абоненты)</span> 
                            </router-link>
                        </div>
                        <div class="card-body">
                            <div class="card-title"></div>
                        <div class="card-text"> 
                            <p><small>Данный отчет поможет вам посмотреть посмотреть</small></p>
                            <ul>
                                <li><small>данные по неплательщикам</small></li>
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