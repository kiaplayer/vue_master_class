<template>
  <div class="col-full">
    <h1>Welcome to the Forum</h1>
    <ForumList :forums="forums"/>
  </div>
</template>

<script>
import sourceData from '../data.json'
import ForumList from '@/components/ForumList'

export default {
  components: {
    ForumList
  },
  data () {
    return {
      forums: Object.values(sourceData.forums)
    }
  }
}
</script>
