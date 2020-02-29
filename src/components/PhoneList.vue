<template>
  <div>
    <section class="section">
      <div class="container">
        <search></search>
      </div>
    </section>

    <div class="columns">
      <phone v-for="(phone, index) in phoneList" :key="index" :phone="phone"></phone>
    </div>
  </div>
</template>

<script>
import Search from "./Search";
import Phone from "./Phone";
export default {
  components: {
    Search,
    Phone
  },

  data() {
    return {
      phoneList: [
        {
          'name': 'User 1',
          'company': 'Company 1',
          'items': [
            {
              'item-name': 'Address',
              'item-value': 'Montebyr St.'
            }
          ]
        }
      ]
    }
  }
};
</script>

<style scoped>
</style>