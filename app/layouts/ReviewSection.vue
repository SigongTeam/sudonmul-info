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

  computed: {
    dummy() {
      return [
        {rating: 2, text: "Hello, World!"},
        {rating: 2, text: "Hello, World!"},
        {rating: 2, text: "Hello, World!"},
        {rating: 2, text: "Hello, World!"},
        {rating: 1, text: "Hello, World!"},
        {rating: 0, text: "Hello, World!"},
        {rating: 0, text: "Hello, World!"}
      ]
    }
  }
}
</script>
