<template>
    <div class="post--buttons">
        <button @click="togglePostDeletion">Supprimer ce post</button>
        <div v-if="displayConfirmDeletion !== false" class="post--buttons--confirmDeletion">
            <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
            <button @click="deletePost">Oui</button>
            <button @click="togglePostDeletion">Non</button>
        </div>
    </div>
</template>

<script>
import PostsService from '../services/PostsService.js'

export default {
    data() {
        return {
            displayConfirmDeletion: false
        }
    },
    props: {
        postToDelete: Number,
    },
    methods: {
        async deletePost() {
            try {
                await PostsService.deletePost({
                    postIdToDelete: this.postToDelete
                })
                this.updatePostsList()
            } catch (err) {
                console.error(err.message)
            }
        },
        updatePostsList() {
          this.$emit("update-posts-list")
        },
        togglePostDeletion() {
            !this.displayConfirmDeletion ? this.displayConfirmDeletion = true : this.displayConfirmDeletion = false
        }
    }
}

</script>

<style scoped lang="scss">
.post--buttons {
        display: flex;
        flex-direction: column;
        & button {
            align-self: center;
            width: 50%;
            border: 1px solid black;
            border-radius: 10px;
            margin: 5px 0;
        }
        &--confirmDeletion {
            margin-top: 20px;
            width: 50%;
            align-self: center;
        }
    }
</style>