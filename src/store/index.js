import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '../data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  actions: {
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', {post, postId})
      commit('appendPostToThread', {postId, threadId: post.threadId})
      commit('appendPostToUser', {postId, userId: post.userId})
      return Promise.resolve(state.posts[postId])
    },
    updateUser ({commit}, user) {
      commit('setUser', {userId: user['.key'], user})
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
        commit('appendThreadToForum', {threadId, forumId})
        commit('appendThreadToUser', {threadId, userId})
        resolve(state.threads[threadId])
      })
    },
    updateThread ({commit, state}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        const post = state.posts[thread.firstPostId]
        const newThread = {...thread, title}
        const newPost = {...post, text}
        commit('setThread', {thread: newThread, threadId: id})
        commit('setPost', {post: newPost, postId: thread.firstPostId})
        resolve(newThread)
      })
    }
  },
  getters: {
    authUser (state) {
      return state.users[state.authId]
    }
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
    appendPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]
      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }
      Vue.set(thread.posts, postId, postId)
    },
    appendPostToUser (state, {postId, userId}) {
      const user = state.users[userId]
      if (!user.posts) {
        Vue.set(user, 'posts', {})
      }
      Vue.set(user.posts, postId, postId)
    },
    appendThreadToForum (state, {threadId, forumId}) {
      const forum = state.forums[forumId]
      if (!forum.threads) {
        Vue.set(forum, 'threads', {})
      }
      Vue.set(forum.threads, threadId, threadId)
    },
    appendThreadToUser (state, {threadId, userId}) {
      const user = state.users[userId]
      if (!user.threads) {
        Vue.set(user, 'threads', {})
      }
      Vue.set(user.threads, threadId, threadId)
    }
  }
})
