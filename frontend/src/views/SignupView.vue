<template>
  <div class="signupFields">
    <div class='signupFields--container'>
      <input type="text" name="prenom" v-model="firstName" placeholder="Prénom">
      <input type="text" name="nom" v-model="lastName" placeholder="Nom">
      <input type="email" name="email" v-model="email" placeholder="Email">
      <input type="password" name="password" v-model="password" placeholder="Mot de passe">
    </div>
    <button>S'inscrire</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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
