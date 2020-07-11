<template>
  <div class="container m-4">
    <b-form>
      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.username"
          required
          placeholder="Username"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button @click="login" variant="primary">Login</b-button>
      <b-button @click="getTutorials" variant="secondary">Get Tutorials</b-button>
      <b-button @click="getTutorialsForced" variant="secondary">Get Forced</b-button>
    </b-form>
    {{ token }} {{ loginError }}
  </div>
</template>

<script>


  export default {
    name : `LoginPage`,
    data() {
      return {
        form: {
          username: 'mapua',
          password: 'mapua',
        },
        loginError : null
      }
    },
    computed: {
      token() {
        return this.$store.getters['user/token']
      },
    },
    methods: {
      login(){
        this.loginError = null
        const {username, password } = this.form
        this.$store.dispatch(`user/login`, {username, password}).then(() => {
          this.$router.push('/')
        })
        .catch(err => this.loginError = err.message)
      },
      getTutorials(){
        this.$store.dispatch(`tutorial/getAllTutorials`).then(response =>{
          console.log('response :>> ', response);
        })
      },
      getTutorialsForced(){
        this.$store.dispatch(`tutorial/getAllTutorialsForced`).then(response =>{
          console.log('response :>> ', response);
        })
      }
    }
  }
</script>

<style scoped>

</style>