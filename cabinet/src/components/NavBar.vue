<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light " style="background-color: #e3f2fd;" >
    <div class="container-fluid ">
    
    <a href="#" class="navbar-brand" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
       <img src="@/assets/logo2.png" width="160" height="38" class="rounded"  alt="КСУ Личный кабинет"  /> 
    </a>

    <ul class="d-flex">
      <div class="nav navbar-nav mr-auto mt-2">
        <li class="nav-item">
          <router-link to="/service" class="nav-link">
            <font-awesome-icon icon="home" />Главная
          </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav mt-2">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Зарегистрироваться
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Войти
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto mt-2">
        <li class="nav-item d-flex">
          <router-link to="/service" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.session.staff.name }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Выйти
          </a>
        </li>
      </div>
    </ul>
    </div>
  </nav>
    
</template>

<script>

export default {
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    
  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },

}
</script>

<style scoped>
</style>