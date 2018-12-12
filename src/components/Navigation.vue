<template>
  <sui-menu borderless class="nav-bar">
    <div is="sui-container">
      <sui-menu-item><router-link :to="{ name: 'Home', params: {} }">Home</router-link></sui-menu-item>
      <sui-menu-menu position="right">
        <sui-dropdown
          text="Account"
          pointing
        >
          <sui-dropdown-menu>
            <sui-menu-item @click="logout" v-if="user"><a href="#">Logout</a></sui-menu-item>
            <sui-menu-item v-else-if="!user"><router-link :to="{ name: 'Login', params: {} }">Login</router-link></sui-menu-item>
            <sui-menu-item v-else-if="!user"><router-link :to="{ name: 'SignUp', params: {} }">Register</router-link></sui-menu-item>
          </sui-dropdown-menu>
        </sui-dropdown>
      </sui-menu-menu>
    </div>
  </sui-menu>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navigation',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    logout: function () {
      firebase
        .auth().signOut()
        .then(() => {
          this.$router.replace('login')
        })
    }
  },
  created () {
    this.user = firebase.auth().currentUser || false
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    border: none;
    box-shadow: none;
  }

  .container {
    max-width: 700px !important;
  }
</style>
