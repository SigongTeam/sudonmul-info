<template>
  <tap-section class="review-section">
    <h2>리뷰</h2>
    <comment-view :comments="dummy"></comment-view>
  </tap-section>
</template>

<style scoped>
  @import "@vars";
  .review-section {
    background: var(--review-background);
    height: 40vh;

    & h2 {
      font-weight: 600;
    }
  }
</style>

<script>
import CommentView from './CommentView.vue'
import TapSection from '../components/TapSection.vue'

export default {
  components: {
    CommentView,
    TapSection
  },

  data: () => ({ dummy: [] }),

  created () {
    fetch('/review')
      .then(res => res.json())
      .then(json => (this.dummy = json.slice(0, 15)))
      .catch(err => alert(err))
  }
}
</script>
