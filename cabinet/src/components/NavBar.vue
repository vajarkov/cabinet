<template>
    
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        
        <a href="/" class="navbar-brand" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">КСУ</a>
        <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">
            <font-awesome-icon icon="home" /> Главная
          </router-link>
        </li>
        
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Зарегистрироваться
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Войти
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Выйти
          </a>
        </li>
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