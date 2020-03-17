<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          
          <div class="field">
            <label class="label">Name</label>
            <div class="control has-icons-left">
              <input class="input" type="text" v-model="name">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input class="input" type="email" v-model="email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Administrator</label>
            <div class="control">
              <label class="radio">
                <input type="radio" name="question" v-model="admin">
                Yes
              </label>
              <label class="radio">
                <input type="radio" name="question" v-model="admin">
                No
              </label>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary">Submit</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../http/http'
export default {
  props: ['id'],

  data() {
    return {
      name: '',
      email: '',
      admin: false,
    }
  },

  mounted () {
    if (this.id) {
      axios.get('user/' + this.id)
      .then(res => {
        console.log(res.data)
        this.name = res.data.user.name
        this.email = res.data.user.email
        this.admin = res.data.user.admin
      })
      .catch(err => console.log(err))
    }
  },

  methods: {
    
  }
}
</script>

<style>
</style>