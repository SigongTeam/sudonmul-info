<template>
  <tap-section class="review-section">
    <h1>리뷰</h1>
    <comment-view></comment-view>
  </tap-section>
</template>

<style scoped>
  @import "@vars";
  .review-section {
    background: var(--review-background);
  }
</style>

<script>
import CommentView from './CommentView.vue'
import TapSection from '../components/TapSection.vue'

export default {
  components: {
    CommentView,
    TapSection
  }
}
</script>
