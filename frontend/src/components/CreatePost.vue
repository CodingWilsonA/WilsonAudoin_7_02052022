<template>
    <div class="createPost">
        <h2>Créez votre post ici</h2>
        <v-text-field v-model="postText" label="Exprimez-vous"></v-text-field>
        <div class="createPost--buttonsContainer">
            <img v-if="imageUrl" :src="this.imageUrl" class="createPost--buttonsContainer--postImage"/>
            <add-image @send-img-url="setImageUrl"/>
            <button v-if="this.postText === ''" class="createPost--buttonsContainer--button createPost--buttonsContainer__invalidButton">Envoyer</button>
            <button v-else @click="createPost" class="createPost--buttonsContainer--button createPost--buttonsContainer__validButton">Envoyer</button>
        </div>
        <p v-if="this.errorMessage && !this.postText">{{ errorMessage }}</p>
    </div>
</template>

<script>
import PostsService from '../services/PostsService'
import AddImage from './AddImage.vue'

export default {
    components: {
        AddImage
    },
    data() {
        return {
            postText: '',
            imageUrl: '',
            errorMessage: ''
        }
    },
    methods: {
    async createPost() {
      try {
        await PostsService.createPost({
        content: this.postText,
        imageUrl: this.imageUrl,
        authorId: this.$store.state.userId,
        })
        this.postText = ''
        this.imageUrl = ''
        this.errorMessage = ''
        this.updatePostsList()
      } catch (err) {
        this.errorMessage = 'Oups ! Votre post n\'a pas pu être créé. Veuillez réessayer ultérieurement.'
        this.postText = ''
        console.error(err.response.data)
        }
      },
      updatePostsList() {
          this.$emit("update-posts-list")
      },
      setImageUrl(payload) {
          this.imageUrl = payload.imgUrl
      }
    }
}


</script>

<style scoped lang="scss">

.createPost {
    background:rgba(78,81,102,0.65);
    margin-top: 40px;
    width: 80vw;
    align-self: center;
    border: 1px solid #4E5166;
    box-shadow: 0px 0px 10px #FFD7D7;
    border-radius: 15px;
    padding: 20px;
    & h2 {
        background-color: #FFD7D7;
        border-radius: 15px;
    }
    &--buttonsContainer {
        display: flex;
        flex-direction: column;
        &--button {
        cursor: pointer;
        font-weight: bold;
        background-color: #FFD7D7;
        padding: 5px;
        border-radius: 10px;
        margin-top: 20px;
        opacity: 0.7;
        transition: all ease-in-out 200ms;
        &:hover {
            opacity: 1;
        }
        }
        &--postImage {
            align-self: center;
            width: 200px;
        }
        &__invalidButton {
            opacity: 1;
            background-color: #FD2D01;
            color: #FFD7D7;
            cursor: default;
        }
    }
}
#getImage {
    display: none;
}

</style>
