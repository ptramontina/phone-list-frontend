<template>
  <div id="app">
    <navbar></navbar>
    <phone-list></phone-list>
  </div>
</template>

<script>

import Navbar from './components/Navbar'
import PhoneList from './components/PhoneList'

export default {
  name: 'App',
  components: {
    Navbar,
    PhoneList,
  }
}
</script>

<style>

</style>
