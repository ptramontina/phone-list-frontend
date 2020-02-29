<template>
  <div>
    <article class="message">
      <div class="message-header">
        <p>{{data.name}}</p>
        <p>{{data.company}}</p>
      </div>
      <div class="message-body">
        <div class="level">
          <div class="level-item" v-for="(item, index) in data.items" :key="index">
            <i v-if="item.item_icon" :class="[item.item_icon]"></i>: {{item.item_value}}
          </div>
        </div>
      </div>
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