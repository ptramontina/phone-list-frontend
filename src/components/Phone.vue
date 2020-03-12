<template>
  <div>
    <article class="message">
      <div class="message-header">
        <p>{{data.name}}</p>
        <p>{{data.company.name}}</p>
      </div>
      <div class="message-body">
        <div class="level">
          <div class="level-item" v-for="(item, index) in data.phones" :key="index">
            <phone-number :item="item"></phone-number>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import PhoneNumber from './PhoneNumber'
export default {
  props: ['data'],
  components: {
    PhoneNumber
  }
}
</script>

<style>
</style>