<template>
    
    <div class="offcanvas offcanvas-start" style="width:15%;" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-scroll="true" data-bs-backdrop="true">
        <div class="offcanvas-header">
            <h6 class="offcanvas-title d-none d-sm-block" id="offcanvas" data-bs-dismiss="offcanvas">Меню</h6>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body px-0">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu" >
                <router-link  to="/dashboard" class="nav-link text-truncate" data-bs-dismiss="offcanvas">
                    <i class="fs-5 bi-laptop"></i><span class="ms-1 d-none d-sm-inline">Доска</span>
                </router-link>
                <router-link  to="/reports" class="nav-link text-truncate" data-bs-dismiss="offcanvas">
                    <i class="fs-5 bi-journal-bookmark-fill"></i><span class="ms-1 d-none d-sm-inline">Отчеты</span> 

                </router-link>
               
                <router-link  to="/tasks" class="nav-link text-truncate" data-bs-dismiss="offcanvas">
                    <i class="fs-5 bi-list-task"></i><span class="ms-1 d-none d-sm-inline">Задачник</span>
                </router-link>
                
                
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>

</style>

