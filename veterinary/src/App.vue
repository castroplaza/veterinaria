<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/about">Sobre Nosotros</router-link> |
      <template v-if="this.$store.state.isLoggedIn && this.$store.state.from == 'V'">
      <router-link to="/owners">Propietarios</router-link> |
      </template>
      <template v-if="!this.$store.state.isLoggedIn">
      <router-link to="/loginP">IniciarP</router-link> |
      <router-link to="/loginV">IniciarV</router-link> 
      </template>
      
      <template v-if="this.$store.state.isLoggedIn">
      <a class="nav-link" @click="salir">Salir</a>
      </template>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from "vuex"
export default {
  name: 'App',
  mounted(){
      this.$store.dispatch('autoLogin')
  },
  methods: {
    ...mapActions(['salir', 'autoLogin'])
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url('assets/bg.jpg') center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
