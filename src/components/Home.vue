<template>
  <div class="home">
    <el-button @click="toggle = true" id="newPostBtn">
      Add Post
    </el-button>
    <el-form id="postForm" v-if="toggle" v-on:submit.prevent="addPost(title, imgURL, desc)"  :label-position="top">
      <el-form-item label="An interesting title" required>
        <el-input id="title" v-model="title"/>
      </el-form-item>
      <el-form-item label="Image URL">
        <el-input id="imageURL" v-model="imgURL"/>
      </el-form-item>
      <el-form-item label="What's on your mind?" required>

        <el-input type="textarea" :rows="4" name="description" id="description" v-model="desc" />
      </el-form-item>
      <el-button @click="toggle = false">
        Submit
      </el-button>
      <el-button @click="toggle = !toggle" @click.prevent>
        Cancel
      </el-button>
    </el-form>
    <div class="postFeed">

      <el-card class="card" v-for="(post, i) in posts" :key="i" :offset="i > 0 ? 4 : 0" shadow="hover" :body-style="{ padding: '0px' }">
        <img :src="post.imgURL" class="image"/>
        <div style="padding: 14px">
          <span class="post-title">{{ post.title }}</span>
          <div class="bottom clearfix">
            <time class="post-time">{{ post.timestamp }}</time>
            <span class="post-user">{{ post.user }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import { db } from '../main.js'

export default {
  name: 'Home',
  data () {
    return {
      toggle: false,
      posts: [],
      title: '',
      imgURL: '',
      desc: '',
      error: ''
    }
  },
  firestore () {
    return {
      posts: db.collection('posts')
    }
  },
  methods: {
    addPost (title, imgURL, desc) {
      const timestamp = moment().format('LLL')
      const { currentUser } = firebase.auth()
      db.collection('posts').add({ title, imgURL, desc, timestamp, user: currentUser.email })
      this.title = ''
      this.imgURL = ''
      this.desc = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  #newPostBtn {
    width: 100%;
    margin-bottom: 20px;
  }

  #postForm {
    margin-bottom: 20px;
  }

  .postFeed {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    .card {

      .image {
        width: 100%;
        display: block;
      }
    }

  }


}
</style>
