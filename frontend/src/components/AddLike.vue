<template>
    <div>
        <div class="likes">
            <svg v-if="canUserLike === false" class="likes--heartIcon likes--heartIcon__invalid" version="1.1" viewBox="0 0 512 512">
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
            </svg> 
            <svg v-else @click="updateLikes" class="likes--heartIcon" version="1.1" viewBox="-8 -8 512 512">
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
            </svg> 
            <p>
                {{ postLikes }}
            </p>
        </div>
        <p class="likes--errorMessage" v-if="errorMessage"> {{ errorMessage }}</p>
    </div>
</template>

<script>
import PostsService from '../services/PostsService'

export default {
    data() {
        return {
            usersLikesArray: [],
            canUserLike: true,
            errorMessage: '',
        }
    },
    props: {
        postLikes: Number,
        likedPostId: Number,
        userIdLiked: Number
    },
    methods: {
        async updateLikes() {
            try {
                await PostsService.updateLikes({
                    postId: this.likedPostId
                })
                this.postUserIdLike()
                this.updatePostsList()
            } catch (err) {
                this.errorMessage = "Oops ! Nous n'avons pas pu ajouter votre like. Veuillez essayer ultérieurement."
                console.error(err.message)
                return
            }
        },
        async postUserIdLike() {
            try {
                await PostsService.postUserIdLike({
                    userId: this.userIdLiked,
                    postId: this.likedPostId
                })
                this.getUsersWhoLiked()
            } catch (err) {
                console.error(err.message)
                return
            }
        },
        async getUsersWhoLiked() {
            try {
                const usersWhoLikedServiceResponse = await PostsService.getUsersWhoLiked()
                this.usersLikesArray = usersWhoLikedServiceResponse.data
                this.isPostAlreadyLiked()
            } catch(err) {
                console.error(err.message)
                return
            }
        },
        updatePostsList() {
            this.$emit("update-posts-list")
        },
        isPostAlreadyLiked() {
            this.usersLikesArray.forEach(userLike => {
                if (userLike.user_id === this.userIdLiked && userLike.post_id === this.likedPostId) {
                    this.canUserLike = false
                }
            });
        }
    },
    beforeMount() {
        this.getUsersWhoLiked()
    }    
}

</script>

<style scoped lang="scss">
.likes {
    display: flex;
    justify-content: center;
    &--heartIcon {
        fill: #FD2D01;
        width: 25px;
        cursor: pointer;
        transform: scale(1);
        transition: all 200ms ease-in-out;
        &:hover {
            transform: scale(1.2);
        }
        &__invalid {
            overflow: visible;
            stroke: white;
            stroke-width: 20px;
            fill: #4E5166;
            cursor: default;
            &:hover {
                transform: scale(1);
            }
        }
    }
    & p {
        margin: 10px;
    }
    &--errorMessage {
        color: red;
    }
}
</style>