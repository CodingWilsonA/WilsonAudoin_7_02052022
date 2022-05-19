<template>
    <div class="loginFields">
        <div class='loginFields--container'>
            <v-text-field label="Email" v-model="email"></v-text-field>
            <v-text-field label="Mot de passe" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show"></v-text-field>
        </div>
        <p class="loginFields--errorMessage">{{ errorMessage }}</p>
        <button class="loginFields--button" @click='login'>Se connecter</button>
    </div>
</template>

<script>
import LoginService from '../services/LoginService'

export default {
  data() {
    return {
      errorMessage: '',
      show: false,
      email: '',
      password: ''
    }
  },
  methods : {
    async login() {
      try {
        await LoginService.login({
          email: this.email,
          password: this.password
        })
      }
      catch (err) {
        this.errorMessage = 'Ces identifiants ne correspondent à aucun utilisateur enregistré.'
        return console.error(err.response.data)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.loginFields {
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;
  box-shadow: 0px 0px 10px black;
    &--container {
      display: flex;
    flex-direction: column;
    width: 400px;
    }
    &--errorMessage {
      font-size: 11px;
      font-weight: bold;
      color: red;
      margin-bottom: 15px;
    }
    &--button {
      padding: 5px;
      border-radius: 5px;
      color: white;
      background-color: blue;
    }
}

</style>