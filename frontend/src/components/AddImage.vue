<template>
    <form enctype="multipart/form-data" class="createPost--buttonsContainer">
        <p v-if="errorMessage !== ''">{{ errorMessage }}</p>
        <label for="getImage" class="createPost--buttonsContainer--button">Ajoutez une image</label>
        <input type="file" ref="imageFile" name="getImage" id="getImage" @change="selectImage">
    </form>
</template>

<script>
import PostService from '../services/PostsService.js'

export default {
    data() {
        return {
            imageFile: '',
            errorMessage: ''
        }
    },
    methods: {
        selectImage() {
            this.imageFile = this.$refs.imageFile.files[0]
            this.sendImageFile(this.imageFile)
        },
        async sendImageFile(imageFile) {
            const formData = new FormData()
            formData.append('imageFile', imageFile)
            try {
                await PostService.uploadImage(formData)
            } catch(err) {
                this.errorMessage = "Oops ! Nous n'avons pas pu ajouter votre image."
                console.error(err.message)
            }
        }
    }
}


</script>

<style scoped lang="scss">

.createPost--buttonsContainer--button {
    cursor: pointer;
    font-weight: bold;
    background-color: #FFD7D7;
    padding: 5px;
    border-radius: 10px;
    margin-top: 20px;
}
    

#getImage {
    display: none;
}

</style>
