<template>
  <div class="signupFields">
    <div class='signupFields--container'>
      <input type="text" name="prenom" v-model="firstName" placeholder="Prénom">
      <input type="text" name="nom" v-model="lastName" placeholder="Nom">
      <input type="email" name="email" v-model="email" placeholder="Email">
      <input type="password" name="password" v-model="password" placeholder="Mot de passe">
    </div>
    <button @click="register">S'inscrire</button>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      await AuthService.register({
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
  background-color: blue;
    &--container {
      display: flex;
    flex-direction: column;
    width: 400px;
    }
    &--container input {
      margin: 15px;
    }
}

</style>
