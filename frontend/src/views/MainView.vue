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
    <ul class="main--postList">
      <list-posts 
        v-for="post in postsArray"
        :key="post.post_id"
        :content="post.content"
        :imgUrl="post.img_url"
        :likes="post.likes"
        :creationDate="post.created_at"
        :updateDate="post.updated_at"
        :authorId="post.author_id"
        :postId="post.post_id"
      />
    </ul>
  </div>
</template>

<script>
import CreatePost from '../components/CreatePost.vue'
import ListPosts from '../components/ListPosts.vue'
import PostsService from '../services/PostsService.js'

export default {
  data() {
    return {
      postsArray: []
    }
  },
  components: { 
    CreatePost,
    ListPosts 
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
    async getAllPosts() {
      try {
        const postsServiceResponse = await PostsService.getAllPosts()
        this.postsArray = postsServiceResponse.data
        console.log(this.postsArray)
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
  &--postList {
    margin-top: 30px;
    align-self: center;
  }
}


</style>
