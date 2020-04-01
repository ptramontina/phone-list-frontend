<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="search" class="input" type="text" placeholder="Type your search" />
                <span class="icon is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="search.length === 0">
      <div class="columns" v-for="(phone, index) in phoneList" :key="index">
        <div class="column is-offset-2 is-8">
          <phone-detail :data="phone"></phone-detail>
        </div>
      </div>
    </div>
    <div v-else-if="search.length > 0 && filteredPhoneList.length > 0">
      <div class="columns" v-for="(phone, index) in filteredPhoneList" :key="index">
        <div class="column is-offset-2 is-8">
          <phone-detail :data="phone"></phone-detail>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="columns">
        <div class="column is-offset-2 is-8">
          <div class="notification is-danger has-text-centered">
            Your search returned no results
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneDetail from './PhoneDetail'
import axios from '../http/http'

export default {
  components: {
    PhoneDetail
  },

  data() {
    return {
      phoneList: [],
      filteredPhoneList: [],
      search: '',
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
  },

  watch: {
    'search': function (val) {
      this.filteredPhoneList = this.phoneList.filter(pl => {
        return pl.name.includes(val) || pl.email.includes(val) || (pl.company && pl.company.name.includes(val))
      })
    }
  }
};
</script>

<style scoped>
</style>