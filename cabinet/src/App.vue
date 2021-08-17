<template>
    <div id="app">
      <nav-bar></nav-bar>
      <div class="container">
        
        <router-view />
        <Panel v-show="currentUser" />
      </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Panel from "@/components/Panel"
export default {
  components: {
    NavBar,
    Panel
  },
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    }
  },
  mounted () {
        document.title = "КСУ Личный кабинет"
    },
}
</script>

<style>
  body {
    padding-top: 90px;
  }


</style>
