<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">MySql-Express-Nove-VueJs</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/tutorials" class="nav-link">Tutorials</a>
        </li>
        <li class="nav-item">
          <a href="/add" class="nav-link">Add Tutorial</a>
        </li>
      </div>
      <a href="#" class="btn btn-danger">hey </a>
      <b-button @click="logout" variant="danger">Logout</b-button>
    </nav>
    <div class="container mt-3">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      logout(){
        this.$store.dispatch(`user/logout`).then(() => {
          this.$router.push('/login')
        })
      },
    }
  }
</script>

<style scoped>

</style>