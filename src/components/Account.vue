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

    <el-row class="table-row" v-for="post in posts">
      <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6"><img class="account-tbl-img" :src="post.imgURL" /></el-col>
      <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6" class="td-summary">
        <h3 class="td-title">{{post.title}}</h3>
        <p class="td-desc">
          {{post.desc}}
        </p>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="td-score"><span></span>{{post.timestamp}}</el-col>
      <el-col :xs="10" :sm="6" :md="6" :lg="6" :xl="6" class="td-score"><span>Score: </span>{{post.vote}}</el-col>
      <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="td-ops">
          <a class="ops-edit" @click=""><i class="el-icon-edit"></i></a>
          <a class="ops-delete" @click=""><i class="el-icon-delete"></i></a>
      </el-col>
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
      user: null
    }
  },
  methods: {

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
    }

        .table-row {
          display: block;
          border-bottom: 1px solid #e6e6e6;
          padding: 20px;

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

            .ops-edit {
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
      }

</style>
