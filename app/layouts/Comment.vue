<template>
  <div class="comment">
    <div class="emoji">
      {{emoji}}
    </div>

    <div class="text">
      {{text}}
    </div>
  </div>
</template>

<style>
  @import "@vars";

  .comment {
    display: flex;
    font-family: vars(--font);
    align-items: center;

    & .emoji {
      font-size: 2rem;
      font-weight: 600;
      padding: 10px;
    }

    & .text {
      font-size: 1.2rem;
    }
  }
</style>

<script>
  export default {
    props: {
      rating: {
        type: Number,
        required: true
      },

      text: {
        type: String,
        required: true
      }
    },

    computed: {
      emoji() {
        return [':(', ':|', ':)'][this.rating];
      }
    }
  }
</script>
