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
import PostsService from '../services/PostsService.js'

export default {
  components: { 
    CreatePost 
  },
  methods: {
    logout() {
      this.$store.dispatch('storeToken', null)
      this.$store.dispatch('storeUserId', null)
      this.$router.push({
        name: 'login'
      })
    },
    async getAllPosts() {
      try {
        const postsServiceResponse = await PostsService.getAllPosts()
        const postsArray = postsServiceResponse.data
        console.log(postsArray)
      } catch (err){
        console.error(err.message)
        return
      }
    }
  },
  beforeMount() {
    if (!this.$store.state.userLoggedIn) {
      this.logout()
    }
    this.getAllPosts()
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
