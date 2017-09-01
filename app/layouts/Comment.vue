<template>
  <div class="comment-wrapper">
    <div class="comment">
      <div class="emoji" :class="emojiName">
        {{emoji}}
      </div>

      <div class="right-column">
        <div class="timestamp">
          {{ago}}
        </div>

        <div class="message">
          {{message || '(추가 정보 없음)'}}
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
    align-items: center;
    color: #202020;
    padding: 0 10px;

    & .emoji {
      font-size: 5rem;
      font-weight: 600;
      padding: 10px;
      width: 55px;
      text-align: center;

      &.smile {
        color: var(--smile-color);
      }

      &.norm {
        color: var(--norm-color);
      }

      &.frown {
        color: var(--frown-color);
      }
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

    emojiName () {
      return ['frown', 'norm', 'smile'][this.rating]
    },

    ago () {
      return moment(this.timestamp).fromNow()
    }
  }
}
</script>
