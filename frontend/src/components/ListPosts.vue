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
            <button>Modifier ce post</button>
            <button>Supprimer ce post</button>
        </div>
    </li>
</template>

<script>
export default {
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
    }
}
</style>