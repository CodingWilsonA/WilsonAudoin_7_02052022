<template>
    <div>
        <button @click="togglePostModification">Modifier ce post</button>
        <div v-if="displayPostModification" class="postModification">
            <v-textarea auto-grow rows="1" v-model="postModificationText" label="Modifiez le texte de votre post ici"></v-textarea>
            <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
            <div class="postModification--buttons">
                <button v-if="postModificationText === ''" class="postModification--buttons__invalid">Mettre à jour</button>
                <button v-else @click="updatePost">Mettre à jour</button>
                <button>Modifier l'image</button>
                <button @click="togglePostModification">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script>
import PostsService from '../services/PostsService'

export default {
    data() {
        return {
            postModificationText: '',
            displayPostModification: false,
            errorMessage: '',
        }
    },
    methods: {
        togglePostModification() {
            !this.displayPostModification ? this.displayPostModification = true : this.displayPostModification = false
        },
        async updatePost() {
            try {
                this.postModificationText = ''
                await PostsService.updatePost({
                    modifiedContent: this.postModificationText,
                    postId: this.postToModify
                })
                this.togglePostModification()
                this.updatePostsList()
            } catch (err) {
                this.errorMessage = "Oops ! Nous n'avons pas pu mettre à jour votre post. Veuillez essayer ultérieurement."
                console.error(err.message)
            }
        },
        updatePostsList() {
            this.$emit("update-posts-list")
        }
    },
    props: {
        postToModify: Number
    }
   
}
</script>

<style scoped lang="scss">
.postModification {
    margin-bottom: 20px;
    &--buttons {
        display: flex;
        justify-content: space-between;
        &__invalid {
            opacity: 1;
            cursor: default;
            background-color: #FD2D01;
            color: #FFD7D7;
        }
        & button {
            width: 30%;
        }
    }
}
button {
    background-color: #FFD7D7;
    color: #FD2D01;
    opacity: 0.7;
    border: 1px solid black;
    border-radius: 10px;
    margin: 5px 0;
    width: 50%;
    transition: all ease-in-out 200ms;
    &:hover {
        opacity: 1;
    }
}
.errorMessage {
    color: red;
    text-shadow: 0px 0px 1px black;
}

</style>