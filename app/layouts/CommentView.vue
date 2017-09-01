<template>
  <section class="comment-view">
    <div class="stat">
      <div class="graphs">
        <div class="progress-container">
          <div class="text">:(</div>
          <div class="graph frown" ref="frown"></div>
        </div>

        <div class="progress-container">
          <div class="text">:|</div>
          <div class="graph norm" ref="norm"></div>
        </div>

        <div class="progress-container">
          <div class="text">:)</div>
          <div class="graph smile" ref="smile"></div>
        </div>
      </div>
      <div class="stat-wrapper" v-if="indice">
        <div class="stat-grade">{{indiceGrade}}</div>
        <div class="stat-text">{{indiceText}}</div>
      </div>
    </div>

    <div class="comment-list">
      <comment
        v-for="comment in comments"
        :key="comment._id"
        :rating="comment.rating"
        :message="comment.message"
        :timestamp="comment.timestamp"
        :juso="comment.juso">
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
    flex: 1;
  }

  hr {
    margin: 0 .1rem;
  }

  .stat {
    display: flex;
    padding: 0 20px;
  }

  .stat-wrapper {
    display: flex;
    flex-direction: column;
  }

  .stat-text {
    font-size: 5rem;
    font-weight: 600;
  }

  .stat-grade {
    font-size: 1.7rem;
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

      &.smile {
        background: var(--smile-color);
      }

      &.norm {
        background: var(--norm-color);
      }

      &.frown {
        background: var(--frown-color);
      }
    }
  }
</style>

<script>
import Comment from './Comment.vue'

const emojiNames = ['frown', 'norm', 'smile']
const gradeNames = ['매우 좋지 않음', '좋지 않음', '약간 좋지 않음', '그럭저럭', '약간 좋음', '좋음', '매우 좋음']

export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },

  components: { Comment },
  data: () => ({ bars: [] }),

  methods: {
    getRatings (rating) {
      return this.comments.filter(c => c.rating === rating).length
    }
  },

  computed: {
    indice () {
      const indice = emojiNames
        .map((_, rating) => rating * this.getRatings(rating))
        .reduce((a, b) => a + b, 0)

      return indice / (this.comments.length * 2)
      // Rating = Coefficient, Indice -> Min: 0, Max: comments.length * 2
    },

    indiceText () {
      return `${(100 * this.indice).toFixed(1)}%`
    },

    indiceGrade () {
      const index = Math.floor(this.indice * gradeNames.length)
      return gradeNames[Math.min(gradeNames.length - 1, index)]
    }
  },

  updated () {
    emojiNames.forEach((emoji, rating) => {
      const percentage = this.getRatings(rating) / this.comments.length
      this.$refs[emoji].style.width = `${percentage * 100}%`
    })
  }
}
</script>
