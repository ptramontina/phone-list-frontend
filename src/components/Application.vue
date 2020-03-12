<template>
  <div>
    <navbar></navbar>
    <phone-list></phone-list>
    <a @click="teste" class="button">Teste</a>
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
      axios.post('me')
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