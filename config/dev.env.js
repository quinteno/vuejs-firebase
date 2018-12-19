'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  FIREBASE_API_KEY: '"AIzaSyC2gmNhJFORgGkIm0UGESsaw8JU-fmE7MY"',
  FIREBASE_AUTH_DOMAIN: '"drape-vuejs.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://drape-vuejs.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"drape-vuejs"',
  FIREBASE_STORAGE_BUCKET: '"gs://drape-vuejs.appspot.com"',
  FIREBASE_MESSAGING_SENDER_ID: '"1058111268871"'
})
