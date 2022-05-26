<template>
  <div id="app">
    <v-app>
      <v-main>
        <img class="homeLogo" alt="Groupomania logo" src="./assets/icon.svg">
        <nav>
          <router-link to="/">Se connecter</router-link> |
          <router-link to="/signup">S'inscrire</router-link>
        </nav>
        <router-view/>
      </v-main>
    </v-app>
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
}

.homeLogo {
  width: 300px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: white !important;
    background-color: black;
    text-decoration: none;
    border-radius: 10px;
    padding: 5px;
    transition: opacity 200ms ease-in-out;

    &:hover {
      opacity: 0.7;
    }

    &.router-link-exact-active {
      color: white;
      background-color: #42b983;
    }
  }
}
</style>