<template>
  <tap-section class="write-section">
    <h2>이 물은?</h2>
    <div class="button-wrapper">
      <tap-button @click="open('smile')">:)</tap-button>
      <tap-button @click="open('norm')">:|</tap-button>
      <tap-button @click="open('frown')">:(</tap-button>
    </div>
  </tap-section>
</template>

<style scoped>
  @import "@vars";
  .write-section {
    background: var(--write-background);

    & h2 {
      color: #fff;
      font-weight: 600;
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
</style>

<script>
import TapButton from "../components/TapButton.vue"
import TapSection from "../components/TapSection.vue"

export default {
  components: {
    TapButton,
    TapSection
  }
}
</script>
