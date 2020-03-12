<template>
  <div>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-large"><i :class="icon"></i></span>
          <span class="tag is-large">{{item.number}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    icon() {
      switch (this.item.type) {
        case 0:
          return 'fas fa-phone'
        case 1:
          return 'fas fa-mobile-alt'
        case 2:
          return 'fab fa-whatsapp'
        default:
          return 'fas fa-phone'
      }
    }
  }
}
</script>

<style>
</style>