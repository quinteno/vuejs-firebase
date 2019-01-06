<template>
<div class="account">
  <!-- <table>
      <tbody>
        <tr class="table-row" v-for="post in posts">
          <td>
            <img class="account-tbl-img" :src="post.imgURL" />
          </td>
          <td class="td-title">{{post.title}}</td>
          <td class="td-desc">{{post.desc}}</td>
          <td class="td-score">Score: {{post.vote}}</td>
          <td class="td-timestamp">{{post.timestamp}}</td>
          <td class="td-ops">
            <el-button type="danger">Delete</el-button>
          </td>
        </tr>
      </tbody>
    </table> -->
    <h3 class="accounts-header">Your Posts</h3>
      <el-button @click="toggle = true" id="editPostBtn">
        Enable edit mode
      </el-button>
    <el-row class="table-row" v-for="post in posts">
      <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6"><img class="account-tbl-img" :src="post.imgURL" /></el-col>
      <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6" class="td-summary">
        <h3 class="td-title">{{post.title}}</h3>
        <p class="td-desc">
          {{post.desc}}
        </p>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="24" class="td-score"><span></span>{{post.timestamp}}</el-col>
      <el-col :xs="10" :sm="6" :md="6" :lg="4" :xl="4" class="td-score"><span>Score: </span>{{post.vote}}</el-col>
      <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="td-ops">

          <a class="ops-delete" @click="deletePost(post)"><i class="el-icon-delete"></i></a>
      </el-col>
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
        <el-button @click="toggle = false" @click.prevent="updatePost(post)" :disabled="!postIsValid">
          Submit
        </el-button>
        <el-button @click="toggle = !toggle" @click.prevent>
          Cancel
        </el-button>
      </el-form>
    </el-row>
</div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main.js'

export default {
  name: 'Account',
  data () {
    return {
      posts: [],
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
    deletePost (post) {
      //console.log(post.id)
      const postRef = db.collection('posts')
      postRef.doc(post.id).delete().then(function() {
        //console.log('deleted');
      })
    },
    updatePost (post) {
      const postRef = db.collection('posts').doc(post.id)
      postRef.update({
        "title": this.title,
        "imgURL": this.imgURL,
        "desc": this.desc
      }).then(function () {
        console.log(post.id + ' was successfully updated.')
      })
    }
  },
  mounted () {
    const user = firebase.auth().currentUser

    this.$bind('posts', db.collection('posts').where('user', '==', user.email))
      .then(() => {
        this.loading = false
      })
  }
}
</script>

<style lang="scss" scoped>
  .account {
    margin-top: 20px;
    font-weight: 300;
    font-size: .75rem;

    .accounts-header {
      text-align: left;
      font-size: 35px;
      font-family: 'Crimson Text', serif;
    }

    #editPostBtn {

        width: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #2294d2;
        border: none;
        color: white;
        transition: .2s ease-in-out;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        text-align: left;
        display: block;

        &:hover {
          -webkit-box-shadow: 0 5px 12px 0 rgba(0,0,0,.1);
          box-shadow: 0 5px 12px 0 rgba(0,0,0,.1);
          background-color: #1f81b7;
        }

    }

    .ops-edit {

      text-align: left;
      background-color: #2294d2;
      font-size: 20px;
      position: relative;
      cursor: pointer;
      transition: .3s ease-in-out;
    }

        .table-row {
          display: block;
          border-bottom: 1px solid #e6e6e6;
          margin-bottom: 20px;

          .account-tbl-img {
            width: 100%;
            object-fit: cover;
            float: left;

            @media screen and (min-width: 480px) {
              max-width: 150px;
            }


          }

          .td-summary {
            padding-top: 20px;
            text-align: left;
            font-weight: bold;

            .td-title {
              margin: 0;

            }

            .td-desc {
              width: 100%;

              font-weight: normal;
            }
          }

          .td-score {
            width: 50%;
            padding-top: 30px;
            text-align: left;
            span {
              font-weight: bold;
            }
          }

          .td-ops {
            position: relative;
            top: -1rem;
            text-align: left;
            float: right;


              &:hover {
                opacity: .75;
                transition: .3s ease-in-out;
              }
            }

            .ops-delete {
              width: 25%;
              margin-right: 20px;
              font-size: 20px;
              float: left;
              position: relative;
              left: 50%;
              cursor: pointer;
              transition: .3s ease-in-out;

              &:hover {
                opacity: .75;
                transition: .3s ease-in-out;
              }
            }
          }

        }


</style>
