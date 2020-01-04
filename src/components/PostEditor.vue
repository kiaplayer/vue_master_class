<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
          v-model="text"
        />
    </div>
    <div class="form-actions">
      <input type="submit" class="btn-blue" value="Submit post">
    </div>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        text: ''
      }
    },
    props: {
      threadId: {
        required: true,
        type: String
      }
    },
    methods: {
      save () {
        const post = {
          text: this.text,
          userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
          threadId: this.threadId,
          publishedAt: Math.floor(Date.now() / 1000)
        }
        this.$emit('save', {post})
        this.$store.dispatch('createPost', post)
        this.text = ''
      }
    }
  }
</script>
