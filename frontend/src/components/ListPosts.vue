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
        <div v-if="authorId === this.$store.state.userId || this.$store.state.userAuthLvl === 1">
            <modify-post 
                @update-posts-list="updatePostsList"
                :postToModify="this.postId"
            />
            <delete-post 
                @update-posts-list="updatePostsList"
                :postToDelete="this.postId"
            />
        </div>
    </li>
</template>

<script>
import ModifyPost from '../components/ModifyPost.vue'
import DeletePost from '../components/DeletePost.vue'

export default {
    components: { 
        ModifyPost,
        DeletePost
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
        updatePostsList() {
          this.$emit("update-posts-list")
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
}
</style>