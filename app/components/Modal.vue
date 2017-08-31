<template>
  <transition name="modal" :duration="400">
    <div v-if="opened">
      <div class="backdrop" @click="backdropClose"></div>
      <section class="modal-view">
        <a @click="closeModal" class="modal-closer" v-if="backdropClosable">&times;</a>
        <slot></slot>
      </section>
    </div>
  </transition>
</template>

<style lang="less" scoped>
  .backdrop {
     background: rgba(0, 0, 0, 0.6);
     position: fixed;
     left: 0;
     top: 0;
     width: 100vw;
     height: 100vh;
     z-index: 99;
  }

  .modal-view {
     position: fixed;
     left: 15vw;
     top: 15vh;
     width: 70vw;
     height: 70vh;
     background: #fff;
     z-index: 100;
  }

  .modal-closer {
     color: #a1a1a1;
     cursor: pointer;
     font-size: 20px;
     position: absolute;
     top: 10px;
     right: 10px;
  }

  .modal-view, .backdrop{
    transition: all .4s ease;
  }

  .modal-enter, .modal-leave-active {
    & .modal-view, .backdrop {
      opacity: 0;
      transform: scale(1.1);
    }
  }
</style>

<script>
export default {
  props: {
    backdropClosable: {
      type: Boolean
    },

    opened: {
      type: Boolean
    }
  },

  methods: {
    closeModal () {
      this.$emit('close')
    },

    backdropClose () {
      if (this.backdropClosable) { this.$emit('close') }
    }
  }
}
</script>
