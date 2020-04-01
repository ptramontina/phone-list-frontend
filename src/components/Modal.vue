<template>
  <div :class="['modal', show ? 'is-active' : '']">
    <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirm?</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          Do you really want to do that action?
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="confirm">Save changes</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
    </div>
  </div>
</template>

<script>
import Events from '../resources/events'
export default {
  data() {
    return {
      show: false,
      callback: null,
      props: null,
    }
  },
  mounted() {
    Events.$on('showModal', (showModal, callback = null, props = null) => {
      this.show = showModal
      this.callback = callback
      this.props = props
    })
  },
  methods: {
    closeModal() {
      Events.$emit('showModal', false)
    },
    confirm() {
      Events.$emit('confirm', this.callback, this.props)
      this.closeModal()
    }
  }
}
</script>

<style>

</style>