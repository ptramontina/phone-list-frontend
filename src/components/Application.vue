<template>
  <div>
    <navbar></navbar>
    <phone-list></phone-list>
    <a @click="teste" class="button">Teste</a>
    <a @click="teste2" class="button">Teste2</a>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import PhoneList from "./PhoneList";
import axios from '../http/http'
export default {
  components: {
    Navbar,
    PhoneList
  },
  methods:{
    teste() {
      axios.post('auth/me')
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    },
    teste2() {
      axios.post('auth/refresh')
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>
</style>