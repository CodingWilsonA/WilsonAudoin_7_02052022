<template>
  <div id="app">
    <img class="homeLogo" alt="Groupomania logo" src="./assets/icon.svg">
    <nav>
      <router-link to="/">Se connecter</router-link> |
      <router-link to="/signup">S'inscrire</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c3e50;
}

.homeLogo {
  width: 300px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>