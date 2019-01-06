<template>
  <div id="app">
    <nav class="nav-bar" mode="horizontal">
      <router-link class="navbar-brand":to="{ name: 'Home', params: {} }">dråpe <i class="material-icons logo">
wifi_tethering
</i></router-link>
      <a role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" class="navbar-burger burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
        <span data-v-30db2012="" aria-hidden="true"></span>
        <span data-v-30db2012="" aria-hidden="true"></span>
        <span data-v-30db2012="" aria-hidden="true"></span>
      </a>
      <div class="nav-bar-inner" :class="{ 'is-active': showNav }">
        <div class="nav-left">
          <!-- <router-link :to="{ name: 'Home', params: {} }">dråpe</router-link> -->
          <router-link :to="{ name: 'Home', params: {} }">Home</router-link>
          <router-link v-if="user" :to="{ name: 'Account', params: {} }">Account</router-link>
        </div>
        <div class="nav-right">
          <span @click="logout" v-if="user"><a href="#">Logout</a></span>
          <div v-else-if="!user">
            <router-link :to="{ name: 'Login', params: {} }">Login</router-link>
            <router-link :to="{ name: 'SignUp', params: {} }">Sign Up</router-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">

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
      user: null,
      showNav: false
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
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/navbar.sass";


#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: #2c3e50;
  background: rgb(249, 249, 249);


  input {
    font-family: 'Montserrat', sans-serif !important;
  }

  nav {
    text-decoration: none;
    color: black;
    width: 100%;
    align-items: center;

    .navbar-brand {
      display: flex;
      flex: 1;
      padding: 0 1.5rem;
      font-size: 20px;
      text-decoration: none;
      color: black;
      font-weight: bold;
      font-family: 'Crimson Text', serif;

      .logo {
        position: relative;
        top: .3rem;
        color: #2294d2;
      }
    }

    .is-active {
      span+span+span{
        display: block;
        width: 16px;
        margin: 0;
        transition: .2s ease-in-out;}
    }
  }

  .navbar-burger {
    color: #4a4a4a;
    cursor: pointer;
    display: block;
    height: 3.25rem;
    position: relative;
    width: 3.25rem;
    margin-left: auto;

    span {
      background-color: black;
      display: block;
      height: 1px;
      left: calc(50% - 8px);
      position: absolute;
      transform-origin: center;
      transition-duration: 86ms;
      transition-property: background-color,opacity,transform;
      transition-timing-function: ease-out;
      width: 16px;

      &:first-child {
        top: calc(50% - 6px);
      }
    }

    span+span {
      width: 20%;
      margin-left: 10%;
    }

    span+span+span {
      display: none;
    }

    @media screen and (min-width: 768px) {
      display: none;
    }
  }


  .nav-bar {
    width: 100%;
    margin: 0 auto;
    height: 4rem;
    position: relative;
    top: 0px;
    display:grid;
    align-items: center;
    font-size: 15px;
    background: white;

    .navbar-brand {
      display: block;
      position: relative;
      top: 1.2rem;
    }


    .nav-bar-inner {
      width: 90%;
      margin: 0 auto;
      position: relative;
      top: -1.5rem;
      display: grid;
      grid-template-columns: 1fr max-content;
      align-items: center;
      overflow: visible;
      a {
        text-decoration: none;
        color: black;
        transition: .2s ease-in-out;

        &:hover {
          opacity: .5;
          transition: .2s ease-in-out;
        }
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

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    @media screen and (max-width: 768px) {



      .nav-bar-inner.is-active {
        display: block;
      }

      .nav-bar-inner {
        background-color: #fff;
        box-shadow: 0 8px 16px hsla(0,0%,4%,.1);
        width: 100%;
        padding: .5rem 1rem;
        position: relative;
        top: -3rem;


        .nav-left {
          display: block;
          text-align: left;
        }

        .nav-right {
          display: block;
          text-align: left;
        }

        .nav-left a {
          display: block;
          padding: .5rem 0;
        }

        .nav-right a {
          display: block;
          padding: .5rem 0;
        }
      }
    }

  }

  @media screen and (max-width: 768px) {
    .nav-bar {
      display: block;

      .navbar-brand {
        display: block;
        text-align: left;
        margin-left: -.5rem;
        position: relative;
        top: 1rem;
      }

      .navbar-burger {
        position: relative;
        top: -2.5rem;

        &:hover {
          background-color: white;
          opacity: .5;
          transition: .2s ease-in-out;
        }
      }
    }
  }

  .container {
    max-width: 90% !important;
    margin: 0 auto;
  }
}
</style>
