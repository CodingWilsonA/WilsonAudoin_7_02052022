<template>
    <div class="loginFields">
        <div class='loginFields--container'>
            <input type="email" name="email" v-model="email" placeholder="Email">
            <input type="password" name="password" v-model="password" placeholder="Mot de passe">
        </div>
        <button>Se connecter</button>
    </div>
</template>

<script>


export default {
  data() {
    return {
        email: '',
        password: ''
    }
  }
}
</script>

<style scoped lang="scss">

.loginFields {
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