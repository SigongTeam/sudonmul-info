<template>
  <div class="comment">
    <div class="emoji">
      {{emoji}}
    </div>

    <div class="right-column">
      <div class="date">
        {{ago}}
      </div>

      <div class="text">
        {{text}}
      </div>
    </div>
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

    & .text {
      font-size: 1.4rem;
    }

    & .date {
      font-size: 1rem;
    }
  }
</style>

<script>
  import moment from "moment"

  export default {
    props: {
      rating: {
        type: Number,
        required: true
      },

      text: {
        type: String,
        required: true
      },

      date: {
        type: String,
        required: true
      }
    },

    computed: {
      emoji() {
        return [':(', ':|', ':)'][this.rating]
      },

      ago() {
        return moment(this.date).fromNow();
      }
    }
  }
</script>
