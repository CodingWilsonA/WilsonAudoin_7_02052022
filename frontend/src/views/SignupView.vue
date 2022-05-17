<template>
  <div class="signupFields">
    <div class='signupFields--container'>
      <v-text-field label="Prénom" v-model="firstName" :rules="[rules.required]"></v-text-field>
      <v-text-field label="Nom" v-model="lastName" :rules="[rules.required]"></v-text-field>
      <v-text-field type="email" label="Email" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
      <v-text-field 
        label="Mot de passe" 
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
        :type="show ? 'text' : 'password'" 
        :rules="[rules.required, rules.min]"
        @click:append="show = !show"
      ></v-text-field>
    </div>
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
    &--button {
      padding: 5px;
      border-radius: 5px;
      color: white;
      &__invalid {
        background-color: grey;
      }
      &__valid {
        background-color: blue;
      }
    }
}

</style>
