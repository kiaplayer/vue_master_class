<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList
      :posts="posts"
    />
    <form @submit.prevent="addNewPost">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
          v-model="newPostText"
        />
      </div>
      <div class="form-actions">
        <input type="submit" class="btn-blue" value="Submit post">
      </div>
    </form>
  </div>
</template>

<script>
  import sourceData from '../data.json'
  import PostList from '../components/PostList'

  export default {
    components: {
      PostList
    },
    props: {
      id: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        thread: sourceData.threads[this.id],
        newPostText: ''
      }
    },
    computed: {
      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(sourceData.posts).filter(post => postIds.includes(post['.key']))
      }
    },
    methods: {
      addNewPost () {
        const postId = 'greatPost' + Math.random()
        const post = {
          text: this.newPostText,
          userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
          threadId: this.id,
          publishedAt: (new Date()).getTime(),
          '.key': postId
        }
        this.$set(sourceData.posts, postId, post)
        this.$set(this.thread.posts, postId, postId)
        this.$set(sourceData.users[post.userId].posts, postId, postId)
        this.newPostText = ''
      }
    }
  }
</script>
