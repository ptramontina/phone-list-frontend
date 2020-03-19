<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">

          <form @submit.prevent="submit">
          
          <div class="field">
            <label class="label">Name</label>
            <div class="control has-icons-left">
              <input class="input" type="text" v-model="name">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <p v-if="errors.includes('required-name')" class="help is-danger">Name is required</p>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input class="input" type="email" v-model="email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <p v-if="errors.includes('required-email')" class="help is-danger">Email is required</p>
            <p v-else-if="errors.includes('invalid-email')" class="help is-danger">This email is invalid</p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input class="input" type="password" v-model="password" :placeholder="isEdit ? 'Leave empty to not change' : ''" :required="!isEdit">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <p v-if="errors.includes('required-password')" class="help is-danger">Password is required</p>
          </div>

          <div class="field">
            <label class="label">Administrator</label>
            <div class="control">
              <label class="radio">
                <input type="radio" name="admin" v-model="admin" :value="true">
                Yes
              </label>
              <label class="radio">
                <input type="radio" name="admin" v-model="admin" :value="false">
                No
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">Active</label>
            <div class="control">
              <label class="radio">
                <input type="radio" name="acrive" v-model="active" :value="true">
                Yes
              </label>
              <label class="radio">
                <input type="radio" name="acrive" v-model="active" :value="false">
                No
              </label>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button :class="['button', 'is-primary', isLoading ? 'is-loading' : '']" type="submit">Submit</button>
            </div>
            <div class="control">
              <router-link to="/users">
                <button class="button is-link is-light">Cancel</button>
              </router-link>
            </div>
          </div>

          </form>


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
      password: '',
      admin: false,
      active: false,

      errors: [],

      isLoading: false,
    }
  },

  mounted () {
    this.getUserIfEdit()
  },

  methods: {
    getUserIfEdit () {
      if (this.isEdit) {
        axios.get('user/' + this.id)
        .then(res => {
          console.log(res.data)
          this.name = res.data.user.name
          this.email = res.data.user.email
          this.admin = res.data.user.admin
          this.active = res.data.user.active
        })
        .catch(err => console.log(err))
      }
    },
    submit () {
      this.isLoading = true
      this.errors = []

      if (!this.name) {
        this.errors.push('required-name')
      }

      if (!this.email) {
        this.errors.push('required-email')
      } else if (!this.validEmail(this.email)) {
        this.errors.push('invalid-email')
      }

      if (!this.isEdit && this.password.length === 0) {
        this.errors.push('required-password')
      }

      if (this.errors.length > 0) {
        this.isLoading = false
        return 
      }

      axios({
        url: this.isEdit ? '/user/' + this.id : '/user',
        method: this.isEdit ? 'put' : 'post',
        data: {
          name: this.name,
          email: this.email ,
          admin: this.admin ,
          active: this.active,
          password: this.password.length > 0 ? this.password : null
        }
      })
      .then(res => {
        if (res.data.success) {
          this.$router.push('/users');
        } 
      })
      .catch(err => {
        console.log(err)
        this.isLoading = false
      })

    },
    validEmail (email) {
      let re = /^(([^<>()[\]\\.,;:s@"]+(.[^<>()[\]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  },

  computed: {
    isEdit() {
      return this.id
    }
  }
}
</script>

<style>
</style>