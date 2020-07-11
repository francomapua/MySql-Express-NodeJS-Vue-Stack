<template>
  <div class="container m-4">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

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
      <b-button @click="logout" variant="secondary">Logout</b-button>
      <br>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    {{ JSON.stringify(response) }}
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService"

  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: [],
          username: '',
          password: '',
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
        response : null
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        const {username, password } = this.form
        UserDataService.login({username, password})
          .then(response => {
            this.response = response
          })
          
      },
      login(evt){
        evt.preventDefault()
        const {username, password } = this.form
        UserDataService.login({username, password})
          .then(response => {
            this.response = response
          })
          .catch(err => {
            this.response = err
          })
      },
      logout(evt){
        evt.preventDefault()
        const {username } = this.form
        UserDataService.logout({username})
          .then(response => {
            this.response = response
          })
          .catch(err => {
            console.log(err)
            this.response = err
          })
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style scoped>

</style>