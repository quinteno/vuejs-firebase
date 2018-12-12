<template>
  <div class="sign-up">
    <h2>Create a new account</h2>
    <sui-form>
      <sui-form-field>
        <sui-input type="text" v-model="email" placeholder="Email" icon="user circle" icon-position="left"/><br />
      </sui-form-field>
      <sui-form-field>
        <sui-input type="password" v-model="password" placeholder="Password" icon="lock" icon-position="left"/><br />
      </sui-form-field>
      <sui-button @click="signUp">Sign Up</sui-button>
      <p>or go back to <router-link :to="{ name: 'Login', params: {} }">login</router-link></p>

    </sui-form>
  </div>
</template>

<script>
import firebase from 'firebase'
// eslint-disable-next-line
import Fire from '../Fire.js'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase
        .auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('home')
        })
        .catch(err => {
          console.log('error: ' + err.message)
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
