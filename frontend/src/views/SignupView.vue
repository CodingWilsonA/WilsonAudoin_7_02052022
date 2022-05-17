<template>
  <div class="signupFields">
    <div class='signupFields--container'>
      <v-text-field label="Prénom" v-model="firstName"></v-text-field>
      <v-text-field label="Nom" v-model="lastName"></v-text-field>
      <v-text-field label="Email" v-model="email"></v-text-field>
      <v-text-field label="Mot de passe" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show"></v-text-field>
    </div>
    <button @click="register">S'inscrire</button>
  </div>
</template>

<script>
import SignupService from '../services/SignupService'

export default {
  data() {
    return {
      show: false,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      await SignupService.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.signupFields {
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;
  box-shadow: 0px 0px 10px black;
    &--container {
      display: flex;
    flex-direction: column;
    width: 400px;
    }
}

</style>
