<template>
  <span :title="timestamp | humanFriendlyDate">{{ timestamp | diffForHumans }}</span>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      timestamp: {
        required: true,
        type: Number
      }
    },
    filters: {
      humanFriendlyDate (timestamp) {
        return moment.unix(timestamp).format('DD.MM.YYYY hh:mm')
      },
      diffForHumans (timestamp) {
        return moment.unix(timestamp).fromNow()
      }
    }
  }
</script>
