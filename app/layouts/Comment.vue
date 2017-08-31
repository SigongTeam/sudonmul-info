<template>
  <div class="comment-wrapper">
    <div class="comment">
      <div class="emoji">
        {{emoji}}
      </div>

      <div class="right-column">
        <div class="timestamp">
          {{ago}}
        </div>

        <div class="message">
          {{message}}
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<style>
  @import "@vars";

  .comment {
    display: flex;
    font-family: vars(--font);
    align-items: center;
    color: #202020;
    padding: 0 10px;

    & .emoji {
      font-size: 5rem;
      font-weight: 600;
      padding: 10px;
    }

    & .message {
      font-size: 1.4rem;
    }

    & .timestamp {
      font-size: 1rem;
    }
  }
</style>

<script>
import moment from 'moment'

export default {
  props: {
    rating: {
      type: Number,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    timestamp: {
      type: String,
      required: true
    }
  },

  computed: {
    emoji () {
      return [':(', ':|', ':)'][this.rating]
    },

    ago () {
      return moment(this.timestamp).fromNow()
    }
  }
}
</script>
