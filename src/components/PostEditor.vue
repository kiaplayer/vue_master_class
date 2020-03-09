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
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue" type="submit" name="Publish">{{ isUpdate ? 'Update post' : 'Submit post' }}</button>
    </div>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        text: this.post ? this.post.text : ''
      }
    },
    props: {
      threadId: {
        required: false,
        type: String
      },
      post: {
        type: Object,
        validator: obj => {
          const ketIsValid = typeof obj['.key'] === 'string'
          const textIsValid = typeof obj.text === 'string'
          const valid = ketIsValid && textIsValid
          if (!ketIsValid) {
            console.error('The post prop object must include a `key` attribute.')
          }
          if (!textIsValid) {
            console.error('The post prop object must include a `text` attribute.')
          }
          return valid
        }
      }
    },
    computed: {
      isUpdate () {
        return !!this.post
      }
    },
    methods: {
      save () {
        this.persist()
          .then(post => {
            this.$emit('save', {post})
          })
      },
      create () {
        const post = {
          text: this.text,
          threadId: this.threadId
        }
        this.text = ''
        return this.$store.dispatch('createPost', post)
      },
      update () {
        const payload = {
          id: this.post['.key'],
          text: this.text
        }
        return this.$store.dispatch('updatePost', payload)
      },
      persist () {
        return this.isUpdate ? this.update() : this.create()
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>
