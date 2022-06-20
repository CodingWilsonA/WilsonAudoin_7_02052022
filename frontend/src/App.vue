<template>
  <div id="app">
    <v-app>
      <v-main>
        <img v-if="!$store.state.userLoggedIn" class="homeLogo" alt="Groupomania logo" src="./assets/img/groupomania-logo.png">
        <nav v-if="!$store.state.userLoggedIn">
          <router-link to="/">Se connecter</router-link>
          <v-spacer></v-spacer>
          <router-link to="/inscription">S'inscrire</router-link>
        </nav>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap');

#app {
  background: linear-gradient(#4E5166 20%, #FFD7D7);
  background-attachment: fixed;
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