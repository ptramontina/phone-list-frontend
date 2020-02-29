<template>
  <div>
    <section class="section">
      <div class="container">
        <search></search>
      </div>
    </section>

    <div class="columns">
      <div class="column is-full" v-for="(phone, index) in phoneList" :key="index">
        <phone :data="phone"></phone>
      </div>
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
          name: "User 1",
          company: "Company 1",
          items: [
            {
              item_name: "Address",
              item_value: "Montebyr St."
            },
            {
              item_name: "Phone",
              item_value: "412"
            }
          ]
        },
        {
          name: "User 2",
          company: "Company 2",
          items: [
            {
              item_name: "Address",
              item_value: "Montebyr St."
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>