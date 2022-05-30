<template>
    <div class="loginFields">
        <div class='loginFields--container'>
            <v-text-field label="Email" v-model="email" :rules='[rules.required]'></v-text-field>
            <v-text-field label="Mot de passe" v-model="password" :rules='[rules.required]' :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show"></v-text-field>
        </div>
        <p class="loginFields--errorMessage">{{ errorMessage }}</p>
        <button class="loginFields--button" @click='login'>Se connecter</button>
    </div>
</template>

<script>
import loginService from '../services/LoginService'

export default {
  data() {
    return {
      rules: {
        required: value => !!value || 'Ce champs est requis.',
      },
      errorMessage: '',
      show: false,
      email: '',
      password: ''
    }
  },
  methods : {
    async login() {
      if (this.email !== '' && this.password !== '') {
        try {
          const loginServiceResponse = await loginService.login({
            email: this.email,
            password: this.password
          })
          console.log(loginServiceResponse)
          this.$store.dispatch('storeToken', loginServiceResponse.data.token)
          this.$store.dispatch('storeUserId', loginServiceResponse.data.userId)
        }
        catch (err) {
          this.errorMessage = 'Ces identifiants ne correspondent à aucun utilisateur enregistré.'
          return console.error(err.response.data)
        }
      } else {
        this.errorMessage = 'Veuillez entrer une adresse email et un mot de passe.'
      }
    }
  }
}
</script>

<style scoped lang="scss">

.loginFields {
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px #4E5166;
    &--container {
      display: flex;
      flex-direction: column;
      width: 400px;
      @media screen and (max-width: 424px) {
          width: 280px;
      }
    }
    &--errorMessage {
      font-size: 11px;
      font-weight: bold;
      color: red;
      margin-bottom: 15px;
      text-align: left;
    }
    &--button {
      width: 100%;
      font-weight: bold;
      padding: 5px;
      border-radius: 5px;
      color: #FD2D01;
      background-color: #FFD7D7;
    }
}

</style>