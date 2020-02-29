<template>
  <div class="column is-offset-2 is-8">
    <article class="message">
      <div class="message-header">
        <p>{{data}}</p>
        <!-- <p>{{data.company}}</p> -->
      </div>
      <!-- <div class="message-body">
        <div class="level">
          <div class="level-item" v-for="(item, index) in data.items" :key="index">
            {{item.item-name}}:{{item.item-value}}
          </div>
        </div>
      </div> -->
    </article>
  </div>
</template>

<script>
export default {
  props: ['data']
};
</script>

<style>
</style>