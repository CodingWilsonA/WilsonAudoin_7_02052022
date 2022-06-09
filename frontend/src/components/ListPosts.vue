<template>
    <li class="post">
        <p>
            {{ content }}
        </p>
        <img v-if="imgUrl !== null" :src="imgUrl">
        <div>
            <p>Likes: {{ likes }}</p>
        </div>
        <p>Créé le : {{ this.formatDate(creationDate) }} par {{ authorFirstName }} {{ authorLastName }}</p>
        <p v-if="updateDate !== null">Modifié le: {{ this.formatDate(updateDate) }}</p>
        <div v-if="authorId === this.$store.state.userId || this.$store.state.userAuthLvl === 1" class="post--buttons">
            <modify-post 
            @update-posts-list="updatePostsList"
            :postToModify="this.postId"
            />
            <button @click="togglePostDeletion">Supprimer ce post</button>
            <div v-if="displayConfirmDeletion !== false" class="post--buttons--confirmDeletion">
                <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
                <button @click="deletePost">Oui</button>
                <button @click="togglePostDeletion">Non</button>
            </div>
        </div>
    </li>
</template>

<script>
import PostsService from '../services/PostsService.js'
import ModifyPost from '../components/ModifyPost.vue'

export default {
    components: { 
        ModifyPost 
    },
    data() {
        return {
            displayConfirmDeletion: false
        }
    },
    props: {
        content: String,
        imgUrl: String,
        likes: Number,
        creationDate: String,
        updateDate: String,
        authorId: Number,
        postId: Number,
        authorFirstName: String,
        authorLastName: String
    },
    methods: {
        formatDate(givenTimeStamp) {
            const dateArray = givenTimeStamp.split(/[-:T.]/)
            const formattedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} à ${dateArray[3]}:${dateArray[4]}`
            return formattedDate
        },
        async deletePost() {
            try {
                    await PostsService.deletePost({
                        postIdToDelete: this.postId
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
.post {
    width: 50vw;
    list-style: none;
    margin: 30px 0;
    padding: 10px;
    border: 1px solid black;
    border-radius: 20px;;
    background-color: #FFD7D7;
    &--buttons {
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
}
</style>