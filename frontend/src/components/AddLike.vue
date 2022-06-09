<template>
    <div class="likes">
        <svg class="likes--heartIcon" version="1.1" viewBox="0 0 512 512">
            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
        </svg> 
        <p>
            {{ postLikes }}
        </p>
    </div>
</template>

<script>

export default {
    props: {
        postLikes: Number
    }    
}

</script>

<style scoped lang="scss">
.likes {
    display: flex;
    justify-content: center;
    &--heartIcon {
        fill: #FD2D01;
        width: 20px;
        cursor: pointer;
        transform: scale(1);
        transition: all 200ms ease-in-out;
        &:hover {
            transform: scale(1.2);
        }
    }
    & p {
        margin: 10px;
    }
}
</style>