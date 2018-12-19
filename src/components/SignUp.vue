<template>
  <div class="sign-up">
    <div class="header-container">
      <h2>Sign Up for a New Account</h2>
      <p>
        The best way to discover and share content with your friends.
      </p>
    </div><br /><br />
    <el-alert
    :title="error"
    class="errorMsg"
    type="error"
    center
    show-icon v-if="error">
    </el-alert>
    <el-form>
      <el-form-item required>
        <el-input type="text" v-model="email" placeholder="Email" /><br />
      </el-form-item>
      <el-form-item required>
        <el-input type="password" v-model="password" placeholder="Password" /><br />
      </el-form-item>
      <!-- <el-form-item required prop="confirmPassword">
        <el-input type="password" v-model="confirmPassword" placeholder="Confirm Password" :rules="comparePasswords" /><br />
      </el-form-item> -->
      <el-form-item required>
        <el-input type="text" v-model="username" placeholder="Username" id="username"/><br />
      </el-form-item>
      <el-button @click="signUp">Sign Up</el-button>
      <p>or go back to <router-link :to="{ name: 'Login', params: {} }">login</router-link></p>

    </el-form>
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
      username: '',
      error: ''
    }
  },
  // computed: {
  //   comparePasswords () {
  //     return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
  //   }
  // }, TODO: add confirm password
  methods: {
    signUp: function () {

      // Create a new user account
      firebase
        .auth().createUserWithEmailAndPassword(this.email, this.password)
          // .then(function (user) {
          //   var user = firebase.auth().currentUser
          //
          //   user.updateProfile({
          //     displayName: document.querySelector('#username').value
          //   })
          //   .then(() => {
          //     console.log('Update Success')
          //
          //   })
          //   // console.log('User created. Redirecting..')
          .then(() => {
            this.$router.replace('home') // TODO: update username on signUp
          })

          // })
          // .catch(err => {
          //   console.log('🤕 ' + err.message)
          //   this.error = '🤕 ' + err.message
          // })
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

    .errorMsg {
      margin-bottom: 20px;
    }
  }
</style>
