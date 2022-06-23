<template>
    <div>
        <button @click="togglePostModification">Modifier ce post</button>
        <div v-if="displayPostModification" class="postModification">
            <v-textarea auto-grow rows="1" v-model="postModificationText" label="Modifiez le texte de votre post ici"></v-textarea>
            <p class="postModification--errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
            <div class="postModification--buttons">
                <button @click="updatePost">Mettre à jour</button>
                <label for="modifyImage" class="postModification--buttons--modifyImageButton">Modifier l'image</label>
                <input type="file" ref="modifyImageFile" name="getImage" id="modifyImage" @change="selectImage">
                <button @click="togglePostModification">Annuler</button>
            </div>
            <p class="postModification--successMessage" v-if="postModificationImageUrl">Votre nouvelle image a bien été ajoutée.</p>
        </div>
    </div>
</template>

<script>
import PostsService from '../services/PostsService'

export default {
    data() {
        return {
            imageFile: '',
            postModificationText: '',
            postModificationImageUrl: '',
            displayPostModification: false,
            errorMessage: '',
        }
    },
    methods: {
        togglePostModification() {
            !this.displayPostModification ? this.displayPostModification = true : this.displayPostModification = false
        },
        async updatePost() {
            if (this.postModificationText !== '' || this.postModificationImageUrl !== '') {
                try {
                await PostsService.updatePost({
                    modifiedContent: this.postModificationText,
                    modifiedImage: this.postModificationImageUrl,
                    postId: this.postToModify
                })
                this.postModificationText = ''
                this.imageFile = ''
                this.postModificationImageUrl = ''
                this.togglePostModification()
                this.updatePostsList()
                } catch (err) {
                this.errorMessage = "Oops ! Nous n'avons pas pu mettre à jour votre post. Veuillez essayer ultérieurement."
                console.error(err)
                }
            } else {
                this.errorMessage = "Veuillez modifier le texte du post, son image ou les deux."
            }
        },
        selectImage() {
            this.imageFile = this.$refs.modifyImageFile.files[0]
            this.sendImageFile(this.imageFile)
            this.$refs.modifyImageFile.value = ''
        },
        async sendImageFile(imageFile) {
            const formData = new FormData()
            formData.append('imageFile', imageFile)
            try {
                const uploadImageServiceResponse = await PostsService.uploadImage(formData)
                this.postModificationImageUrl = uploadImageServiceResponse.data.filePath
                this.errorMessage = ""
            } catch(err) {
                if (err.response.data && err.response.data.message === "INVALID_FILE_TYPE") {
                    this.errorMessage = "Vous pouvez seulement ajouter des fichiers de type image (jpg, jpeg, png ou gif)."
                    console.error(err.response.data.message)
                } else if (err.response.data && err.response.data.message === "INVALID_FILE_SIZE") {
                    this.errorMessage = "Cette image est trop volumineuse (max: 500Ko)."
                    console.error(err.response.data.message)
                } else {
                    this.errorMessage = "Oops ! Nous n'avons pas pu ajouter votre image. Veuillez essayer ultérieurement."
                    console.error(err.code)
                }
            }
        },
        updatePostsList() {
            this.$emit("update-posts-list")
        }
    },
    props: {
        postToModify: Number
    }
   
}
</script>

<style scoped lang="scss">
.postModification {
    margin-bottom: 20px;
    &--errorMessage {
    color: red;
    text-shadow: 0px 0px 1px black;
    }
    &--successMessage {
        margin-top: 20px;
    }
    &--buttons {
        display: flex;
        justify-content: space-between;
        & button {
            width: 30%;
        }
        &--modifyImageButton {
            border-radius: 10px;
            margin: 5px 0;
            width: 30%;
            background-color: #FFD7D7;
            color: #FD2D01;
            border: 1px solid black;
            opacity: 0.7;
            transition: all ease-in-out 200ms;
            cursor: pointer;
            &:hover {
                opacity: 1;
            }
        }
    }
}
button {
    background-color: #FFD7D7;
    color: #FD2D01;
    opacity: 0.7;
    border: 1px solid black;
    border-radius: 10px;
    margin: 5px 0;
    width: 50%;
    transition: all ease-in-out 200ms;
    &:hover {
        opacity: 1;
    }
}

#modifyImage {
    display: none;
}

</style>