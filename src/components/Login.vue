<template lang="html">
  <div class="login">
    <h2>Sign In</h2>
    <sui-form>
      <sui-form-field>
        <sui-input type="text" v-model="email" placeholder="Email" icon="user circle" icon-position="left"/><br />
      </sui-form-field>
      <sui-form-field>
        <sui-input type="password" v-model="password" placeholder="Password" icon="lock" icon-position="left"/><br />
      </sui-form-field>
      <sui-button @click="login">Login</sui-button>
      <p>
        Don't have an account? You can <router-link :to="{ name: 'SignUp', params: {} }">create one</router-link>
      </p>
    </sui-form>

  </div>
</template>

<script>
import firebase from 'firebase'
// eslint-disable-next-line
import Fire from '../Fire.js'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase
        .auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('home')
        })
        .catch(err => {
          console.log('Oops: ' + err.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped> /* "scoped" limits the CSS to this component only */
  .login {
    max-width: 480px;
    margin: 0 auto;

    h2 {
      margin-top: 20vh;
    }
  }
</style>
