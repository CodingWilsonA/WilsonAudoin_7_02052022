<template>
  <div id="app">
    <v-app>
      <v-main>
        <img class="homeLogo" alt="Groupomania logo" src="./assets/icon.svg">
        <nav>
          <router-link to="/">Se connecter</router-link>
          <v-spacer></v-spacer>
          <router-link to="/signup">S'inscrire</router-link>
        </nav>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap');

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 424px) {
    .v-main__wrap {
      width: 300px;
    }
  }


  & .homeLogo {
  width: 300px;
  }

  & nav {
  margin: 30px 0;
  display: flex;
  align-items: center;

    a {
      flex: 30;
      font-weight: bold;
      color: #FD2D01;
      opacity: 0.7;
      background-color: #FFD7D7;
      text-decoration: none;
      border-radius: 5px;
      padding: 5px;
      transition: opacity 200ms ease-in-out;

      &:hover {
        opacity: 1;
      }

      &.router-link-exact-active {
        color: #4E5166;    
        }
    }
  }
}

</style>