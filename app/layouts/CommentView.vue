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

    <template v-for="comment in comments">
      <comment :rating="comment.rating" :message="comment.message" :key="comment.location"></comment>
    </template>
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

export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },

  components: {
    Comment
  },

  computed: {
    ratingMap () {
      return ['frown', 'norm', 'smile']
    }
  },

  mounted () {
    this.ratingMap.forEach((v, i) => {
      const bar = new ProgressBar.Circle(this.$refs[v], {
        color: '#2f493e',
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        }
      })
      bar.animate(this.comments.filter((v) => v.rating === i).length / this.comments.length)
    })
  }
}
</script>
