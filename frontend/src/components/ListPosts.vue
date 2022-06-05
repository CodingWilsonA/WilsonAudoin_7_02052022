<template>
    <li class="post" :data-authorId="authorId" :data-postId="postId">
        <p>
            {{ content }}
        </p>
        <img :src="imgUrl">
        <div>
            <p>Likes: {{ likes }}</p>
        </div>
        <p>Créé le : {{ creationDate }}</p>
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
        postId: Number
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