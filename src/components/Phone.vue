<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <form @submit.prevent="submitPhone">

            <div class="columns">
              <div class="column">          
                <div class="field">
                  <label class="label">Number</label>
                  <div class="control has-icons-left">
                    <input class="input" type="text" v-model="phone.number">
                    <span class="icon is-small is-left">
                      <i class="fas fa-phone"></i>
                    </span>
                  </div>
                  <p v-if="errors.includes('required-number')" class="help is-danger">Number is required</p>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column"> 
                <div class="field">
                  <label class="label">Type</label>
                  <div class="control has-icons-left">
                    
                    <multiselect v-model="phone.type" 
                                label="name"
                                track-by="name"
                                :options="TYPES"
                    ></multiselect>

                  </div>
                  <p v-if="errors.includes('required-type')" class="help is-danger">Type is required</p>
                </div>
              </div>
            </div>  
             
            <div class="columns">
              <div class="column">
                <div class="field is-grouped">
                  <div class="control">
                    <button :class="['button', 'is-primary', isLoading ? 'is-loading' : '']" type="submit">Submit</button>
                  </div>
                  <div class="control">
                    <router-link :to="`/users/${userid}/phones`">
                      <button class="button is-link is-light">Cancel</button>
                    </router-link>
                  </div>
                </div>
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
import multiselect from 'vue-multiselect' 
import { TYPES } from '../resources/constants'
export default {
  props: ['userid', 'phoneid'],

  components: { multiselect },

  data() {
    return {
      phone: {
        id: null,
        number: null,
        type: null
      },
      errors: [],
      isLoading: false
    }
  },

  mounted () {
    this.getPhoneIfEdit()
  },

  methods: {
    getPhoneIfEdit () {
      if (this.isEdit) {
        axios.get(`user/${this.userid}/phone/${this.phoneid}`)
        .then(res => {
          console.log(res.data)
          this.phone = {
            id: res.data.phone.id,
            number: res.data.phone.number,
            type: TYPES.find(t => t.type === res.data.phone.type)
          }
        })
        .catch(err => console.log(err))
      }
    },
    submitPhone () {
      this.isLoading = true
      this.errors = []

      if (!this.phone.number) {
        this.errors.push('required-number')
      }

      if (!this.phone.type) {
        this.errors.push('required-type')
      } 
   
      if (this.errors.length > 0) {
        this.isLoading = false
        return 
      }
      
      axios({
        url: this.isEdit ? `/user/${this.userid}/phone/${this.phoneid}` : `/user/${this.userid}/phone`,
        method: this.isEdit ? 'put' : 'post',
        data: {
          number: this.phone.number,
          type: this.phone.type.type
        }
      })
      .then(res => {
        if (res.data.success) {
          this.$router.push(`/users/${this.userid}/phones/`);
        } 
      })
      .catch(err => {
        console.log(err)
        this.isLoading = false
      })

    }
  },

  computed: {
    isEdit() {
      return this.phoneid
    },
    TYPES () {
      return TYPES
    }
  }
}
</script>

<style>
</style>