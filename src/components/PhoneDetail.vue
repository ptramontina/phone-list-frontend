<template>
  <div>
    <article class="message">
      <div class="message-header">
        <p>{{data.name}}</p>
        <p>{{data.company ? data.company.name : ''}}</p>
      </div>
      <div class="message-body">
        <div v-if="data.phones.length > 0" class="level">
          <div class="level-item" v-for="(item, index) in data.phones" :key="index">
            <phone-number :item="item"></phone-number>
          </div>
        </div>
        <div v-else class="level">
          <div class="level-item">
            <div class="field is-grouped is-grouped-multiline">
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag is-large"><i class="far fa-times-circle"></i></span>
                  <span class="tag is-large">No phones found</span>
                </div>
              </div>
            </div>                     
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