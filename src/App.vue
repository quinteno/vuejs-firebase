<template>
  <div id="app">
    <div class="container">
      <nav class="nav-bar" mode="horizontal">
        <div class="nav-left">
          <span v-if="user">Hello, {{ user.displayName }} !</span>
          <router-link :to="{ name: 'Home', params: {} }">Home</router-link>
          <router-link v-if="user" :to="{ name: '', params: {} }">Profile</router-link>
        </div>
          <!--<sui-menu-item>

          </sui-menu-item>-->
        <div class="nav-right">
          <span @click="logout" v-if="user"><a href="#">Logout</a></span>
          <div v-else-if="!user">
            <router-link :to="{ name: 'Login', params: {} }">Login</router-link>
            <router-link :to="{ name: 'SignUp', params: {} }">Sign Up</router-link>
          </div>
        </div>
      </nav>
      <router-view/>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'

export default {
  name: 'App',
  data () {
    return {
      user: null
    }
  },
  methods: {
    logout: function () {
      firebase
        .auth().signOut()
        .then(() => {
          this.$router.replace('login')
          this.user = null
        })
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = true
      }
    })

  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  input {
    font-family: 'Montserrat', sans-serif !important;
  }

  .nav-bar {
    border: none;
    box-shadow: none;
    display: grid;
    grid-template-columns: 1fr max-content;

    a {
      text-decoration: none;
      color: black;
    }

    .nav-left {
      display: grid;
      grid-gap: 30px;
      grid-template-columns: repeat(5,max-content);
    }

    .nav-right {
      display: grid;
      grid-template-columns: repeat(2, max-content);
      grid-gap: 20px;

      div {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        grid-gap: 30px;
      }
    }
  }

  .container {
    max-width: 90% !important;
    margin: 0 auto;
  }
}
</style>
