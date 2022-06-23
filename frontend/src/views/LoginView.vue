<template>
    <div class="loginFields">
        <div class='loginFields--container'>
            <v-text-field label="Email" v-model="email" :rules='[rules.required]'></v-text-field>
            <v-text-field label="Mot de passe" v-model="password" :rules='[rules.required]' :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show"></v-text-field>
        </div>
        <p v-if="errorMessage !== ''" class="loginFields--errorMessage">{{ errorMessage }}</p>
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
          const groupoUser = {
            token: loginServiceResponse.data.token,
            userId: loginServiceResponse.data.userId,
            userAuthLvl: loginServiceResponse.data.userAuthLvl
          }
          localStorage.setItem('groupoUser', JSON.stringify(groupoUser))
          this.$router.push({
            name: 'main'
          })
        }
        catch (err) {
          if (err.code === "ERR_NETWORK") {
            this.errorMessage = 'Le serveur de l\'application est actuellement indisponible. Veuillez essayer ultérieurement.'
            console.error(err.response)
            return
          } else if (err.response.data.message === "Wrong credentials") {
            this.errorMessage = 'Ces identifiants ne correspondent à aucun utilisateur enregistré.'
            console.error(err.response.data.message)
            return
          } else if (err.response.data.message === "Some field contains a forbidden value") {
            this.errorMessage = "Les caractères spéciaux suivants ne peuvent pas être utilisés : < > \" ' ` $"
            console.error(err.response.data.message)
            return
          } else if (err.response.data === "Too many requests, please try again later.") {
            this.errorMessage = "Vous avez dépassé le nombre de tentatives de connexion autorisé. Veuillez essayer ultérieurement."
            console.error(err.response.data)
            return
          }
        }
      } else {
        this.errorMessage = 'Veuillez entrer une adresse email et un mot de passe.'
      }
    }
  },
  beforeMount() {
    if (localStorage.getItem('groupoUser')) {
      this.$router.push({
        name: 'main'
      })
    }
  }
}
</script>

<style scoped lang="scss">

.loginFields {
  font-weight: bold;
  background:rgba(78,81,102,0.65);
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #4E5166;
  box-shadow: 0px 0px 10px #FFD7D7;
  margin-bottom: 50px;
  &--container {
    display: flex;
    flex-direction: column;
    width: 400px;
    @media screen and (max-width: 424px) {
      width: 280px;
    }
  }
  &--errorMessage {
    max-width: 400px;
    font-size: 16px;
    text-shadow: 0px 0px 2px black;
    font-weight: bold;
    color: red;
    margin-bottom: 15px;
    text-align: left;
    @media screen and (max-width: 424px) {
      max-width: 280px;
    }
  }
  &--button {
    width: 100%;
    font-weight: bold;
    padding: 5px;
    border-radius: 5px;
    color: #FD2D01;
    background-color: #FFD7D7;
    margin-top: 15px;
  }
}

</style>