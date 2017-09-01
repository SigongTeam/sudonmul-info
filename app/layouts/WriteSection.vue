<template>
  <tap-section class="write-section" :class="{finished}">
    <h2>수돗물 평가하기</h2>
    <div class="button-wrapper">
      <tap-button @click="open(2)" class="smile">:)</tap-button>
      <tap-button @click="open(1)" class="norm">:|</tap-button>
      <tap-button @click="open(0)" class="frown">:(</tap-button>
    </div>
    <modal :opened="openStatus" :backdropClosable="true" @close="close" class="modal">
      <div class="modal-inner">
        <textarea placeholder="자세한 리뷰를 남겨주세요! (선택사항)" v-model="comment"></textarea>
        <button class="send" @click="send(opened)">
          <icon icon="send"></icon>
        </button>
      </div>
    </modal>
  </tap-section>
</template>

<style scoped>
  @import "@vars";
  .write-section {
    background: var(--write-background);
    height: 230px;
    transition: all 1s ease;

    & h2 {
      color: #fff;
      font-weight: 600;
    }

    &.finished {
      height: 0;
      padding: 0;
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;

    &>button {
      width: 25%;
      height: 100px;
      font-family: var(--font);
      font-weight: 600;
      font-size: 3rem;
    }
  }

  .modal-inner {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    &>textarea {
      width: 100%;
      flex: 1;
    }
  }
</style>

<script>
import axios from 'axios'
import Geolocation from '../js/geolocation'

import Icon from '../components/Icon.vue'
import Modal from '../components/Modal.vue'
import TapButton from '../components/TapButton.vue'
import TapSection from '../components/TapSection.vue'

export default {
  data: () => ({opened: false, supportsWriting: true, finished: false, comment: ''}),

  components: {
    Icon,
    Modal,
    TapButton,
    TapSection
  },

  methods: {
    open (name) {
      if (this.supportsWriting) {
        this.opened = name
      } else {
        this.send(name)
      }
    },

    close () {
      this.opened = false
    },

    async send (rating) {
      const location = await Geolocation.getParsedPosition()

      const data = {
        location,
        rating,
        comment: this.comment
      }

      await axios.post('/review', data)

      this.close()
      if (this.supportsWriting) {
        this.finished = true
      }
    }
  },

  computed: {
    openStatus () {
      return !!this.opened
    }
  }
}
</script>
