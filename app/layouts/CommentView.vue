<template>
  <section class="comment-view">
    <div class="graphs">
      <div class="progress-container">
        <div class="graph" ref="frown">
          <div class="text">:(</div>
        </div>
      </div>

      <div class="progress-container">
        <div class="graph" ref="norm">
          <div class="text">:|</div>
        </div>
      </div>

      <div class="progress-container">
        <div class="graph" ref="smile">
          <div class="text">:)</div>
        </div>
      </div>
    </div>

    <comment v-for="comment in comments"
      :key="comment.location"
      :rating="comment.rating"
      :message="comment.message">
    </comment>
  </section>
</template>

<style>
  @import "@vars";

  .graphs {
    display: flex;
    justify-content: space-between;
  }

  .progress-container .graph {
    flex: 1;
    padding: 20px;

    position: relative;

    & .text {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font);
      font-size: 2rem;
      font-weight: 600;
    }
  }
</style>

<script>
import Comment from './Comment.vue'
import ProgressBar from 'progressbar.js'

const emojiNames = ['frown', 'norm', 'smile']
const options = {
  color: '#2f493e',
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: { autoStyleContainer: false }
}

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

  mounted () {
    emojiNames.forEach((emoji, rating) =>
      (this.bars[rating] = new ProgressBar.Circle(this.$refs[emoji], options)))
  },

  updated () {
    this.bars.forEach((bar, rating) => {
      const sameRatings = this.comments.filter(c => c.rating === rating)
      bar.animate(sameRatings.length / this.comments.length)
    })
  }
}
</script>
