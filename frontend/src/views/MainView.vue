<template>
  <div id="main">
    <v-toolbar>
      <v-toolbar-title>
        Groupomania
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click='logout'>
          Déconnexion
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>

export default {
  methods: {
    logout() {
      this.$store.dispatch('storeToken', null)
      this.$store.dispatch('storeUserId', null)
      this.$router.push({
        name: 'login'
      })
    },
  },
  beforeMount() {
    if (!this.$store.state.userLoggedIn) {
      this.logout()
    }
  }
}
</script>

<style scoped lang="scss">
#main {
  width: 100vw;
}


</style>
