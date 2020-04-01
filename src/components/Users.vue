<template>
  <div class="section">
    <div class="container">

    <div class="columns">
      <div class="column is-offset-4 is-4">
        <router-link to="users/create">
          <button :class="['button', 'is-primary', 'is-fullwidth', isLoading ? 'is-loading' : '']">
            <span class="icon">
              <i class="fas fa-user-plus"></i>
            </span>
            <span>
              Add user
            </span>
          </button>
        </router-link>
      </div>
    </div>

    <div class="columns" v-if="!isLoading">
      <div class="column">
        <table class="table is-bordered is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th class="has-text-centered">ID</th>
              <th class="has-text-centered">Name</th>
              <th class="has-text-centered">E-mail</th>
              <th class="has-text-centered">Admin</th>
              <th class="has-text-centered">Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-if="users.length > 0">
            <tr v-for="(user, index) in users" :key="index">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td class="has-text-centered">{{user.admin ? 'Yes' : 'No'}}</td>
              <td class="has-text-centered">{{user.active ? 'Yes' : 'No'}}</td>
              <td class="has-text-centered">
                <div class="buttons is-centered are-small">
                  <router-link :to="'users/'+user.id+'/edit'">
                    <button class="button is-primary">
                      <span class="icon is-small">
                        <i class="fas fa-edit"></i>
                      </span>
                    </button>
                  </router-link>
                  <router-link :to="'users/'+user.id+'/phones'">
                    <button class="button is-primary">
                      <span class="icon is-small">
                        <i class="fas fa-phone"></i>
                      </span>
                    </button>
                  </router-link>
                  <button class="button is-danger" @click.prevent="showModal(deleteUser, user.id)">
                    <span class="icon is-small">
                      <i class="fas fa-trash"></i>
                    </span>
                  </button>                  
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="has-text-centered">No users found</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
    <modal></modal>
  </div>
</template>

<script>
import axios from '../http/http'
import Modal from './Modal'
import Events from '../resources/events'
export default {
  components: { Modal },

  data() {
    return {
      users: [],

      isLoading: false
    }
  },

  mounted () {
    this.getUsers()
    Events.$on('confirm', (callback, props) => callback(props))
  },

  methods: {
    getUsers () {
      this.isLoading = true
      axios.get('user')
      .then(res => {
        if (res.data.success) {
          this.users = res.data.users
        }
      })
      .catch(err => console.log(err))
      .finally(()=>this.isLoading = false)
    },
    deleteUser (id) {
      axios.delete('user/' + id)
      .then(res => {
        this.users = this.users.filter(user => user.id !== res.data.user.id)
      })
      .catch(err => {
        console.log(err)
      })
    },
    showModal(callback, props) {
      Events.$emit('showModal', true, callback, props)
    }
  }
}
</script>

<style>
</style>