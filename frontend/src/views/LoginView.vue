<template>
    <div class="loginFields">
        <div class='loginFields--container'>
            <v-text-field label="Email" v-model="email"></v-text-field>
            <v-text-field label="Mot de passe" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show"></v-text-field>
        </div>
        <button>Se connecter</button>
    </div>
</template>

<script>


export default {
  data() {
    return {
      show: false,
      email: '',
      password: ''
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
}

</style>