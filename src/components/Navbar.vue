<template>
  <div>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>

        <a
          role="button"
          :class="['navbar-burger', 'burger', menuActive ? 'is-active' : '']"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
          @click="showItems"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasic" :class="['navbar-menu', menuActive ? 'is-active' : '']">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" @click.prevent="logOut"> <i class="fas-fa-logout"></i> Log out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="tabs is-centered">
      <ul>
        <router-link to="/phone-list" v-slot="{ href, route, navigate, isActive }">
          <li :class="isActive ? 'is-active' : ''">
            <a @click="navigate">
              <span class="icon is-small"><i class="far fa-address-book" aria-hidden="true"></i></span>
              <span>Phone List</span>
            </a>
          </li>
        </router-link>
        <router-link to="/users" v-slot="{ href, route, navigate, isActive }">
        <li :class="isActive ? 'is-active' : ''">
          <a @click="navigate">
            <span class="icon is-small"><i class="fas fa-users" aria-hidden="true"></i></span>
            <span>Users</span>
          </a>
        </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { removeToken } from '../helpers/local-storage'
export default {
  data() {
    return {
      menuActive: false,
    }
  },
  methods: {
    logOut () {
      removeToken()
      this.$router.push("/login")
    },
    showItems () {
      this.menuActive = !this.menuActive
    }
  }
};
</script>

<style>
</style>