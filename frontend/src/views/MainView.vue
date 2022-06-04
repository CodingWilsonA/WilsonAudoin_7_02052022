<template>
  <div class="main">
    <v-toolbar>
      <h1>
        Groupomania
      </h1>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <button @click='logout'>
          Déconnexion
        </button>
      </v-toolbar-items>
    </v-toolbar>
    <create-post />
  </div>
</template>

<script>
import CreatePost from '../components/CreatePost.vue'

export default {
  components: { 
    CreatePost 
  },
  methods: {
    logout() {
      this.$store.dispatch('storeToken', null)
      this.$store.dispatch('storeUserId', null)
      this.$store.dispatch('storeUserAuthLvl', null)
      this.$router.push({
        name: 'login'
      })
    },
  },
  beforeMount() {
    if (!this.$store.state.userLoggedIn) {
      this.logout()
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100vw;
  display: flex;
  flex-direction: column;
  color: #FD2D01;
  & h1 {
    color: #FD2D01;
  }
  & button {
    padding: 5px;
    font-weight: bold;
    color: #FD2D01; 
    background-color: #FFD7D7;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
}


</style>
