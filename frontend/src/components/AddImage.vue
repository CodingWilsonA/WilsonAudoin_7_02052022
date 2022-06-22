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
            imageUrl: '',
            errorMessage: ''
        }
    },
    methods: {
        selectImage() {
            this.imageFile = this.$refs.imageFile.files[0]
            this.sendImageFile(this.imageFile)
            this.$refs.imageFile.value = ''
        },
        async sendImageFile(imageFile) {
            const formData = new FormData()
            formData.append('imageFile', imageFile)
            try {
                const uploadImageServiceResponse = await PostService.uploadImage(formData)
                this.imageUrl = uploadImageServiceResponse.data.filePath
                this.sendImageUrlToParent()
                this.errorMessage = ""
            } catch(err) {
                if (err.response.data.message === "INVALID_FILE_TYPE") {
                    this.errorMessage = "Vous pouvez seulement ajouter des fichiers de type image (jpg, jpeg, png ou gif)."
                    console.error(err.response.data.message)
                } else if (err.response.data.message === "INVALID_FILE_SIZE") {
                    this.errorMessage = "Cette image est trop volumineuse (max: 500Ko)."
                    console.error(err.response.data.message)
                } else {
                    this.errorMessage = "Oops ! Nous n'avons pas pu ajouter votre image."
                    console.error(err.response.data.message)
                }
            }
        },
        sendImageUrlToParent() {
            this.$emit("send-img-url", {imgUrl: this.imageUrl})
        }
    }
}


</script>

<style scoped lang="scss">

.createPost--buttonsContainer{
        &--button {
        cursor: pointer;
        font-weight: bold;
        background-color: #FFD7D7;
        padding: 5px;
        border-radius: 10px;
        margin-top: 20px;
        opacity: 0.7;
        transition: all ease-in-out 200ms;
        &:hover {
            opacity: 1;
        }
    }
}
    

#getImage {
    display: none;
}

</style>
