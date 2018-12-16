<template>
  <div class="sign-up">
    <div class="header-container">
      <h2>Sign Up for a New Account</h2>
      <p>
        The best way to discover and share content with your friends.
      </p>
    </div><br /><br />
    <el-form>
      <el-form-item>
        <sui-input type="text" v-model="email" placeholder="Email" /><br />
      </sui-form-field>
      <sui-form-field>
        <sui-input type="password" v-model="password" placeholder="Password" /><br />
      </sui-form-field>
      <sui-form-field>
        <sui-input type="text" v-model="username" placeholder="Username" id="username"/><br />
      </sui-form-field>
      <sui-button @click="signUp">Sign Up</sui-button>
      <p>or go back to <router-link :to="{ name: 'Login', params: {} }">login</router-link></p>

    </sui-form>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import Fire from '../Fire.js'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  methods: {
    signUp: function () {
      // Create a new user account
      firebase
        .auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('User created. Redirecting..')
          this.$router.replace('home')
        })
        .catch(err => {
          console.log('🤕 ' + err.message)
        })
    }
  }
}

</script>

<style lang="scss" scoped>
  .sign-up {
    max-width: 480px;
    margin: 0 auto;

    h2 {
      margin-top: 20vh;
    }
  }
</style>
