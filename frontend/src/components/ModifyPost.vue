<template>
    <div>
        <button @click="togglePostModification">Modifier ce post</button>
        <div v-if="displayPostModification" class="postModification">
            <v-text-field v-model="postModificationText" label="Modifiez le texte de votre post ici"></v-text-field>
            <div class="postModification--buttons">
                <button @click="updatePost">Mettre à jour</button>
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
            this.togglePostModification()
            await PostsService.updatePost({
                modifiedContent: this.postModificationText
            })
        }
    }
   
}
</script>

<style scoped lang="scss">
.postModification {
    margin-bottom: 20px;
    &--buttons {
        display: flex;
        justify-content: space-between;
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