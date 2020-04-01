<template>
  <div>
      <div class="section">
        <div class="container">
        
          <div class="columns">
            <div class="column is-offset-4 is-4">
              <router-link :to="`/users/${userid}/phones/create`">
                <button class="button is-primary is-fullwidth">
                  <span class="icon">
                    <i class="fas fa-user-plus"></i>
                  </span>
                  <span>
                    Add phone
                  </span>
                </button>
              </router-link>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <table class="table is-bordered is-striped is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th class="has-text-centered">Phone</th>
                    <th class="has-text-centered">Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(phone, index) in phones" :key="index">
                    <td>{{phone.number}}</td>
                    <td>{{TYPE_LIST.find(t => t.type === phone.type).name}}</td>
                    <td class="has-text-centered">
                      <div class="buttons is-centered are-small">
                        <router-link :to="`/users/${userid}/phones/${phone.id}/edit`">
                        <button class="button is-primary">
                          <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                          </span>
                        </button>
                        </router-link>
                        <button class="button is-danger" @click.prevent="deletePhone(phone.id)">
                          <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from '../http/http'
import { TYPES } from '../helpers/constants'
export default {
  props: ['userid'],

  data() {
    return {
      phones: []
    }
  },

  methods: {
    getUserPhones() {
      axios.get('user/'+this.userid+'/phone')
      .then(res => {
        this.phones = res.data.phones
      })
      .catch(err => console.log(err))
    },
    deletePhone (id) {
      axios.delete(`user/${this.userid}/phone/${id}`)
      .then(res => {
        this.phones = this.phones.filter(phone => phone.id !== res.data.phone.id)
      })
      .catch(err => {
        console.log(err)
      })
    }    
  },

  mounted() {
    if(this.userid) {
      this.getUserPhones()
    }
  },

  computed: {
    TYPE_LIST () {
      return TYPES
    }
  }
}
</script>

<style>
</style>