<template>
  <div class="home">
    <el-button @click="toggle = true" id="newPostBtn">
      Add Post
    </el-button>
    <el-form id="postForm" v-if="toggle" label-width="200">
      <div class="form-group">
        <el-form-item label="An interesting title" required class="form-group-input">
          <el-input v-model="title"/>
        </el-form-item>
        <el-form-item label="Image URL" required class="form-group-input"><br />
          <!-- <el-button type="primary" size="medium" @click="onPickFile">Upload Image</el-button>
          <input
          type="file"
          style="display: none;"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked"
          />
          <img :src="imgURL" height="150" /> -->
          <el-input v-model="imgURL" />
        </el-form-item>
      </div>

      <div class="form-group">
        <el-form-item label="What's on your mind?" required class="form-group-input">
          <el-input type="textarea" :rows="4" name="description" id="description" v-model="desc" />
        </el-form-item>
      </div>
      <el-button @click="toggle = false" @click.prevent="addPost(title, imgURL, desc)" :disabled="!postIsValid">
        Submit
      </el-button>
      <el-button @click="toggle = !toggle" @click.prevent>
        Cancel
      </el-button>
    </el-form>
    <div class="postFeed" v-loading="loading">
      <el-card class="card" v-for="(post, i) in posts" :key="i" shadow="hover" :body-style="{ padding: '0px' }">
        <img :src="post.imgURL" class="post-image"/>
        <div style="padding: 14px">
          <div class="user-profile">
            <img class="post-profile-img" :src= " user.photoURL || '../static/default.jpg'" />
            <p class="post-user"><span class="author-by">by </span>{{ post.user }}</p><br />
          </div>
          <p class="post-title">{{ post.title }}</p><br />
          <div class="card-bottom">
            <time class="post-time">{{ post.timestamp }}</time>

            <div class="card-vote">
              <el-button-group class="card-vote-btns">
                <el-button class="thumb-up" @click="upvote(post)"><i class="material-icons">thumb_up_alt</i></el-button>
                <span class="post-score">{{ post.vote }}</span>
                <el-button class="thumb-down" @click="downvote(post)"><i class="material-icons">thumb_down_alt</i></el-button>
              </el-button-group>
            </div>
          </div>
          <span class="hidden-id" style="display: none;">{{ post.id }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import moment from 'moment'
import { db } from '../main.js'

export default {
  name: 'Home',
  data () {
    return {
      toggle: false,
      loading: true,
      posts: [],
      title: '',
      imgURL: '',
      //image: null,
      desc: '',
      user: firebase.auth().currentUser,
      score: null,
      error: ''
    }
  },
  computed: {
    postIsValid () {
      return this.title !== '' &&
        this.imgURL !== '' &&
        this.desc !== ''
    }
  },
  methods: {
    // onPickFile () { //TODO: create Download URLs/upload preview
    //   this.$refs.fileInput.click()
    // },
    // onFilePicked (event) {
    //   const files = event.target.files
    //   let filename = files[0].name
    //   if (filename.lastIndexOf('.') <= 0) {
    //     return alert('Please add a valid file!')
    //   }
    //   const fileReader = new FileReader()
    //   fileReader.addEventListener('load', () => {
    //     this.imgURL = fileReader.result
    //   })
    //   fileReader.readAsDataURL(files[0])
    //   this.image = files[0]
    // },
    addPost (title, imgURL, desc) {
      const timestamp = moment().format('LLL')
      const { currentUser } = firebase.auth()
      const vote = 0
      db.collection('posts').add({ title, imgURL, desc, timestamp, vote, user: currentUser.email })
      this.title = ''
      this.imgURL = ''
      this.desc = ''
    },
    upvote (post) {
      //console.log(post.id)
      this.score = post.vote + 1
      const batch = db.batch()
      const postRef = db.collection('posts').doc(post.id).update({'vote': this.score }).then(() => {
        //console.log('done')
      })
      //batch.update(postRef, {"vote": + 1})
      //console.log(postRef)
      this.score = post.vote
    },
    downvote (post) {
      //console.log(post.id)
      this.score = post.vote - 1
      const batch = db.batch()
      const postRef = db.collection('posts').doc(post.id).update({'vote': this.score }).then(() => {
        //console.log('done')
      })
      this.score = post.vote
    }
  },
  mounted () {
    this.$bind('posts', db.collection('posts').orderBy('timestamp', 'desc'))
      .then(() => {
        this.loading = false
      })
      const user = firebase.auth().currentUser
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  #newPostBtn {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #postForm {

    margin-bottom: 20px;


    .form-group {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      .form-group-input {
        text-align: left;
        margin: 10px;
        flex: 1 1 auto;
        display: block;

        @media screen and (max-width: 480px) {
          width: 100%;
        }
      }
    }
  }

  .postFeed {
    // display: grid;
    // grid-gap: 10px;
    // grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    column-count: 4;


    .card {
      display: inline-block;
      text-align: left;
      font-size: 1rem;
      margin-bottom: .75em;

      .post-image {
        width: 100%;
        height: 30vh;
        object-fit: cover;
        display: block;
      }

      .user-profile {
        display: grid;
        grid-template-columns: repeat(2, max-content);

        .post-profile-img {
          max-width: 20px;
          margin-right: 10px;
          border-radius: 100px;
          display: inline;
        }
        .post-user {
          font-size: .75rem;
          margin: 0;
          position: relative;
          top: 5px;

          .author-by {
            opacity: .5;
          }
        }
      }

      .post-title {
        margin: 0 auto;
        display: block;
        font-weight: bold;
        margin-top: -10px;
        margin-bottom: -10px !important;
      }

      .card-bottom {
        position: relative;

        .post-time {
          opacity: .5;
          font-size: .75rem;
        }



        .card-vote {
          text-align: center;
          display: flex;
          flex: 1;
          width: 100%;

          .card-vote-btns {
            width: 100%;
            display: inline-block;


            .post-score {

              position: relative;
              font-weight: 500;
              opacity: .5;
              font-size: 1rem;
            }

            .el-button {
              position: relative;
              top: 5px;
              float: none;
              border: 0;
              transition: .3s ease-in-out;
              width: 4rem;
              overflow: hidden;
              border-radius: 5px;


              &:hover {
                opacity: .75;
                transition: .3s ease-in-out;
                cursor: pointer;
              }

              &:active {
                transform: scale(.8);
              }


              i {
                color: #2c3e50;
              }
            }

            .thumb-up {
              position:relative;
              left: 10px;
              background: transparent;
            }

            .thumb-down {
              position: relative;
              right: 10px;
              background: transparent;
            }
          }

          i {
            width: 50px;
            color: white;
            display: inline-block;
            text-align: center;


          }


          }
        }
      }

      @media screen and (max-width: 480px) {
        column-count: 1;
        column-gap: 1em;

        .card {
          margin-bottom: 1em;
        }
      }

      @media screen and (min-width: 481px)and (max-width: 960px) {
        column-count: 2;
        column-gap: 1em;
      }

      @media screen and (min-width: 961px) and (max-width: 1200px) {
        column-count: 3;
        column-gap: 1em;
      }

    }

  }

</style>
