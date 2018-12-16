<template lang="html">
  <div class="login">
    <h2>Sign In</h2>
    <el-alert v-if="error" title="error alert" type="error" show-icon></el-alert>
    <el-form>
      <el-form-item>
        <el-input type="text" v-model="email" placeholder="Email Address"/><br />
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="Password"/><br />
      </el-form-item>
      <el-button @click="login">Login</el-button>
      <p>
        Don't have an account? You can <router-link :to="{ name: 'SignUp', params: {} }">create one</router-link>
      </p>
    </el-form>
  </div>
</template>

<script>
import firebase from 'firebase'
// eslint-disable-next-line
import Fire from '../Fire.js'

export default {
  name: 'login',
  props: {
    user: {}
  },
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login: function () {
      firebase
        .auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$emit('loggedInUser', firebase.auth().currentUser)
          this.$router.replace('home')
        })
        .catch(err => {
          this.error = err
        })
    }
  }
}
</script>

<style lang="scss" scoped> /* "scoped" limits the CSS to this component only */
  .login {
    font-family: 'Montserrat', sans-serif;
    max-width: 480px;
    margin: 0 auto;

    h2 {
      margin-top: 20vh;
    }
  }
</style>
