<template>
  <div>
    <section class="section">
      <div class="container">
        <search></search>
      </div>
    </section>

    <div class="columns" v-for="(phone, index) in phoneList" :key="index">
      <div class="column is-offset-2 is-8">
        <phone :data="phone"></phone>
      </div>
    </div>
  </div>
</template>

<script>
import Search from './Search'
import Phone from './Phone'
import axios from '../http/http'

export default {
  components: {
    Search,
    Phone
  },

  data() {
    return {
      phoneList: []
    }
  },

  mounted() {
    this.getPhoneList()
  },

  methods: {
    getPhoneList() {
      axios.get('/get-phone-list')
      .then(res => {
        if (res.data.success) {
          this.phoneList = res.data.phone_list
        }
      })
      .catch(err => console.log(err))
    }
  }
};
</script>

<style scoped>
</style>