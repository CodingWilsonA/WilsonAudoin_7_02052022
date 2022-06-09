<template>
    <div>
        <button @click="togglePostModification">Modifier ce post</button>
        <div v-if="displayPostModification" class="postModification">
            <v-text-field v-model="postModificationText" label="Modifiez le texte de votre post ici"></v-text-field>
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
            displayPostModification: false
        }
    },
    methods: {
        togglePostModification() {
            !this.displayPostModification ? this.displayPostModification = true : this.displayPostModification = false
        },
        async updatePost() {
            try {
                this.togglePostModification()
                await PostsService.updatePost({
                    modifiedContent: this.postModificationText,
                    postId: this.postToModify
                })
                this.updatePostsList()
                this.postModificationText = ''
            } catch (err) {
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
            background-color: #FD2D01;
            color: #FFD7D7;
        }
        & button {
            width: 30%;
        }
    }
}
button {
    border: 1px solid black;
    border-radius: 10px;
    margin: 5px 0;
    width: 50%;
}

</style>