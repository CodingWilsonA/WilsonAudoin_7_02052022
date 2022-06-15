<template>
    <div class="createPost">
        <h2>Créez votre post ici</h2>
        <v-text-field v-model="postText" label="Exprimez-vous"></v-text-field>
        <div class="createPost--buttonsContainer">
            <add-image />
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
            errorMessage: ''
        }
    },
    methods: {
    async createPost() {
      try {
        await PostsService.createPost({
        content: this.postText,
        authorId: this.$store.state.userId,
        })
        this.updatePostsList()
        this.postText = ''
      } catch (err) {
        this.errorMessage = 'Oups ! votre post n\'a pas pu être créé. Veuillez réessayer ultérieurement.'
        this.postText = ''
        console.error(err.response.data)
        }
      },
      updatePostsList() {
          this.$emit("update-posts-list")
      }
    }
}


</script>

<style scoped lang="scss">

.createPost {
    margin-top: 20px;
    width: 80vw;
    align-self: center;
    border: 1px solid #4E5166;
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
        }
        &__invalidButton {
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
