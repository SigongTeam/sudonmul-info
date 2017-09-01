<template>
  <tap-section class="review-section" innerStyle="background: #fff; margin-top: 30px; margin-bottom: 30px">
    <h2>리뷰</h2>
    <comment-view :comments="reviews"></comment-view>
  </tap-section>
</template>

<style scoped>
  @import "@vars";
  .review-section {
    background: var(--review-background);

    & h2 {
      font-weight: 600;
      padding: 0 20px;
    }
  }
</style>

<script>
import axios from 'axios'
import CommentView from './CommentView.vue'
import Geolocation from '../js/geolocation.js'
import TapSection from '../components/TapSection.vue'

export default {
  components: {
    CommentView,
    TapSection
  },

  data: () => ({ reviews: [] }),

  async created () {
    const location = await Geolocation.getParsedPosition()

    axios
      .get('/review', {
        params: {
          location
        }
      })
      .then(res => (this.reviews = res.data))
      .catch(err => alert(err))
  }
}
</script>
