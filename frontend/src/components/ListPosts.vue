<template>
    <li class="post">
        <p>
            {{ content }}
        </p>
        <img v-if="imgUrl" :src="imgUrl">
        <add-like 
            @update-posts-list="updatePostsList"
            :postLikes="this.likes"
            :likedPostId="this.postId"
            :userIdLiked="this.$store.state.userId"
        />
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
import ModifyPost from './ModifyPost.vue'
import DeletePost from './DeletePost.vue'
import AddLike from './AddLike.vue'

export default {
    components: { 
        ModifyPost,
        DeletePost,
        AddLike
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
    color: #FFD7D7;
    font-weight: bold;
    width: 50vw;
    list-style: none;
    margin: 30px 0;
    padding: 10px;
    border: 1px solid #4E5166;
    box-shadow: 0px 0px 10px #FFD7D7;
    border-radius: 20px;
    background:rgba(78,81,102,0.65);
}
</style>