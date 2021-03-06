<template>
  <div class="main">
    <v-toolbar id="toolbar">
      <img class="main--toolbar--groupomaniaLogo" src="../assets/img/groupomania-icon.png" alt="Logo de Groupomania"/>
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
    <create-post @update-posts-list="getAllPosts" />
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
        :authorFirstName="post.first_name"
        :authorLastName="post.last_name"
        @update-posts-list="getAllPosts"
      />
    </ul>
    <div v-if="this.isSessionInvalid" class="main--invalidSession">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import CreatePost from '../components/CreatePost.vue'
import ListPosts from '../components/ListPosts.vue'
import PostsService from '../services/PostsService.js'

export default {
  data() {
    return {
      postsArray: [],
      isSessionInvalid: false,
      errorMessage: '',
    }
  },
  components: { 
    CreatePost,
    ListPosts 
  },
  methods: {
    logout() {
      localStorage.removeItem('groupoUser')
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
      } catch (err){
        if (err.response.data && err.response.data.message === "Unauthenticated request !") {
          this.isSessionInvalid = true
          this.errorMessage = "Votre session a expiré. Vous allez être redirigés vers la page de connexion dans quelques secondes."
          console.error(err.response.data.message)
          return
        } else if (err.code === "ERR_NETWORK") {
          this.isSessionInvalid = true
          this.errorMessage = "Le serveur de l'application est actuellement indisponible. Vous allez être redirigés vers la page de connexion dans quelques secondes."
          console.error(err.code)
          return
        }
      }
    }
  },
  beforeMount() {
    if (!localStorage.getItem('groupoUser')) {
      this.logout()
    } else {
      const groupoUser = JSON.parse(localStorage.getItem('groupoUser'))
      this.$store.dispatch('storeToken', groupoUser.token)
      this.$store.dispatch('storeUserId', groupoUser.userId)
      this.$store.dispatch('storeUserAuthLvl', groupoUser.userAuthLvl)
      this.getAllPosts()
    }
  },
  updated() {
    this.isSessionInvalid ? setTimeout(function() {this.logout()}.bind(this), 6000) : null
  }
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  color: #FD2D01;
  & h1 {
    color: #FD2D01;
    padding: 10px;
  }
  & button {
    margin: 5px;
    padding: 5px;
    font-weight: bold;
    color: #FD2D01; 
    border: 3px solid #4E5166;
    border-radius: 20px;
    background-color: #FFD7D7;
    opacity: 0.7;
    transition: all ease-in-out 200ms;
    &:hover {
      opacity: 1;
    }
  }
  &--toolbar--groupomaniaLogo {
    width: 70px;
    -webkit-filter: 
      drop-shadow(0px 0px 2px #FD2D01)
      drop-shadow(0px 0px 2px #FD2D01);
    filter: 
      drop-shadow(0px 0px 2px #FD2D01) 
      drop-shadow(0px 0px 2px #FD2D01);
  }
  &--postList {
    margin-top: 30px;
    align-self: center;
    padding-left: 0;
  }
  &--invalidSession {
    position:fixed;
    align-self: center;
    background:rgba(0,0,0,0.8);
    z-index:5;
    width:100%;
    height:100%;
    & p {
      top: 40%;
      padding: 50px;
      background-color: white;
      text-align: center;
      width: 50vw;
      margin:0 auto;
      position:relative;
      z-index:10;
      border:5px solid #FFD7D7;
      border-radius:10px;
    }
  }
}

#toolbar {
  background-color: #FFD7D7;
  box-shadow: 0px 0px 10px #4E5166;
  position: sticky;
  top: 0;
  z-index: 2;
}

@media screen and (max-width: 450px) {
    h1 {
        font-size: 20px;
    }
    .main--toolbar--groupomaniaLogo {
      width: 50px;
    }
  }

  @media screen and (max-width: 350px) {
    h1 {
        font-size: 17px;
    }
    .main--toolbar--groupomaniaLogo {
      width: 40px;
    }
  }
  
</style>
