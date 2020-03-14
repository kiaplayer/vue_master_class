import Vue from 'vue'
import Vuex from 'vuex'
import {countObjectProperties} from '../utils'
import * as firebase from 'firebase'

Vue.use(Vuex)

const makeAppendChildToParentMutation = ({parent, child}) =>
  (state, {childId, parentId}) => {
    const resource = state[parent][parentId]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  actions: {
    fetchPost ({commit, state}, {id}) {
      console.log('Fetching post: ' + id)
      return new Promise((resolve, reject) => {
        firebase.database().ref('posts').child(id).once('value', snapshot => {
          const post = snapshot.val()
          post['.key'] = snapshot.key
          commit('setPost', {postId: post['.key'], post})
          resolve(state.posts[id])
        })
      })
    },
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', {post, postId})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})
      return Promise.resolve(state.posts[postId])
    },
    updatePost ({commit, state}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })
        resolve(post)
      })
    },
    fetchUser ({commit, state}, {id}) {
      console.log('Fetching user: ' + id)
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(id).once('value', snapshot => {
          const user = snapshot.val()
          user['.key'] = snapshot.key
          commit('setUser', {userId: user['.key'], user})
          resolve(state.users[id])
        })
      })
    },
    updateUser ({commit}, user) {
      commit('setUser', {userId: user['.key'], user})
    },
    fetchThread ({commit, state}, {id}) {
      console.log('Fetching thread: ' + id)
      return new Promise((resolve, reject) => {
        firebase.database().ref('threads').child(id).once('value', snapshot => {
          const thread = snapshot.val()
          thread['.key'] = snapshot.key
          commit('setThread', {threadId: thread['.key'], thread})
          resolve(state.threads[id])
        })
      })
    },
    createThread ({commit, state, dispatch}, {title, text, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        const thread = {
          'forumId': forumId,
          'publishedAt': Math.floor(Date.now() / 1000),
          'title': title,
          'userId': userId
        }
        thread['.key'] = threadId
        commit('setThread', {thread, threadId})
        dispatch('createPost', {text, threadId})
          .then(post => {
            commit('setThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })
        commit('appendThreadToForum', {childId: threadId, parentId: forumId})
        commit('appendThreadToUser', {childId: threadId, parentId: userId})
        resolve(state.threads[threadId])
      })
    },
    updateThread ({commit, state, dispatch}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        const newThread = {...thread, title}
        commit('setThread', {thread: newThread, threadId: id})
        dispatch('updatePost', {id: thread.firstPostId, text})
          .then(() => {
            resolve(newThread)
          })
      })
    }
  },
  getters: {
    authUser (state) {
      return {}
    },
    userPostsCount: state => id => countObjectProperties(state.users[id].posts),
    userThreadsCount: state => id => countObjectProperties(state.users[id].threads),
    threadRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1
  },
  mutations: {
    setPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },
    setThread (state, {thread, threadId}) {
      Vue.set(state.threads, threadId, thread)
    },
    setUser (state, {user, userId}) {
      Vue.set(state.users, userId, user)
    },
    appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
    appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
    appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'}),
    appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
  }
})
