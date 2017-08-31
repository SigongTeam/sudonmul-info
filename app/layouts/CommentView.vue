<template>
  <section class="comment-view">
    <div class="graphs">
      <div class="progress-container">
        <div class="text">:(</div>
        <div class="graph" ref="frown"></div>
      </div>

      <div class="progress-container">
        <div class="text">:|</div>
        <div class="graph" ref="norm"></div>
      </div>

      <div class="progress-container">
        <div class="text">:)</div>
        <div class="graph" ref="smile"></div>
      </div>
    </div>

    <div class="comment-list">
      <comment
        v-for="comment in comments"
        :key="comment._id"
        :rating="comment.rating"
        :message="comment.message"
        :timestamp="comment.timestamp">
      </comment>
    </div>
  </section>
</template>

<style>
  @import "@vars";

  .graphs {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .comment-list {
    background: #fff;
  }

  hr {
    margin: 0 .1rem;
  }

  .progress-container {
    position: relative;
    display: flex;
    align-items: center;

    & .text {
      font-size: 3rem;
      font-weight: 600;
      width: 30px;
    }

    & .graph {
      background: #2f493e;
      margin-left: 20px;
      height: 20px;
      width: 0;
      transition: width 2s ease;
    }
  }
</style>

<script>
import Comment from './Comment.vue'

const emojiNames = ['frown', 'norm', 'smile']

export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },

  data: () => ({ bars: [] }),

  components: {
    Comment
  },

  updated () {
    emojiNames.forEach((emoji, rating) => {
      const sameRatings = this.comments.filter(c => c.rating === rating)
      const percentage = (sameRatings.length / this.comments.length) * 100
      this.$refs[emoji].style.width = `${percentage}%`
    })
  }
}
</script>
