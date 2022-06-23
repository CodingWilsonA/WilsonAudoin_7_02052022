<template>
  <div class="signupFields">
    <div class='signupFields--container'>
      <v-text-field label="Prénom" v-model="firstName" :rules="[rules.required]"></v-text-field>
      <v-text-field label="Nom" v-model="lastName" :rules="[rules.required]"></v-text-field>
      <v-text-field type="email" label="Email" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
      <p v-if='this.duplicateEmailMessage !== ""' class="signupFields--container__emailError">{{ duplicateEmailMessage }}</p>
      <v-text-field 
        label="Mot de passe" 
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
        :type="show ? 'text' : 'password'" 
        :rules="[rules.required, rules.min]"
        counter
        @click:append="show = !show"
      ></v-text-field>
    </div>
    <p v-if="errorMessage" class="signupFields--errorMessage"> {{ errorMessage }}</p>
    <button class="signupFields--button signupFields--button__invalid" v-if="this.firstName === '' || this.lastName === '' || this.validEmail !== true || this.password.length < 8">S'inscrire</button>
    <button class="signupFields--button signupFields--button__valid" v-else @click="register">S'inscrire</button>
  </div>
</template>

<script>
import SignupService from '../services/SignupService'

export default {
  data() {
    return {
      show: false,
      validEmail: false,
      duplicateEmailMessage: '',
      errorMessage: '',
      rules: {
        required: value => !!value || 'Ce champs est requis.',
        min: v => v.length >= 8 || 'Le mot de passe doit être de 8 caractères minimum',
        email: value => {
            const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (emailPattern.test(value)) {
              this.validEmail = true
              return emailPattern.test(value)
            } else {
              this.validEmail = false
              return 'Cette adresse email n\'est pas valide.'
            }
          },
      },
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      this.validEmail = false
      try {
        const signupServiceresponse = await SignupService.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })
      const groupoUser = {
        token: signupServiceresponse.data.token,
        userId: signupServiceresponse.data.userId,
        userAuthLvl: signupServiceresponse.data.userAuthLvl
      }
      localStorage.setItem('groupoUser', JSON.stringify(groupoUser))
      this.$router.push({
        name: 'main'
      })
      } catch (err){
        if (err.response.data && err.response.data.message.includes('Duplicate')) {
          this.duplicateEmailMessage = "Un compte est déjà enregistré avec cette adresse email."
          console.error(err.response.data)
          return
        } else if (err.code === "ERR_NETWORK") {
          this.errorMessage = 'Le serveur de l\'application est actuellement indisponible. Veuillez essayer ultérieurement.'
          console.error(err.message)
          return
        } 
      }
    }
  }
}
</script>

<style scoped lang="scss">

.signupFields {
  font-weight: bold;
  background:rgba(78,81,102,0.65);
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #4E5166;
  box-shadow: 0px 0px 10px #FFD7D7;
  margin-bottom: 50px;
    &--container {
      width: 400px;
      @media screen and (max-width: 424px) {
        width: 280px;
      }
      &__emailError {
        text-shadow: 0px 0px 2px black;
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        color: red;
      }
    }
    &--errorMessage {
      max-width: 400px;
      text-shadow: 0px 0px 2px black;
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      color: red;
      @media screen and (max-width: 424px) {
        max-width: 280px;
      }
    }
    &--button {
      width: 100%;
      font-weight: bold;
      padding: 5px;
      margin-top: 15px;
      border-radius: 5px;
      &__invalid {
        background-color: #FD2D01;
        color: #FFD7D7;
      }
      &__valid {
        background-color: #FFD7D7;
        color: #FD2D01;
      }
    }
}

</style>
