<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <a class="navbar-brand" href="#">VueJS Imgur</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarMain"
      aria-controls="navbarMain"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarMain">
      <ul class="navbar-nav mr-auto">
        <li :class="[currentPage === 'Home' ? 'active' : '', 'nav-item']">
          <router-link class="nav-link" to="/"><i class="fas fa-home"></i> Accueil</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li :class="[currentPage === 'Login' ? 'active' : '', 'nav-item']" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/login"><i class="fas fa-sign-in-alt"></i> Connexion</router-link>
        </li>
        <li class="nav-item dropdown" v-else>
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user-circle"></i> {{ getUsername }}</a>
            <div class="dropdown-menu dropdown-menu-right">
              <router-link class="dropdown-item" to="/profile"><i class="fas fa-user"></i> Mon profil</router-link>
              <a class="dropdown-item" href="#" @click="logout()"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
            </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  computed: {
    currentPage () {
      return this.$route.name
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    getUsername () {
      return this.$store.getters.username
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err))
    }
  }
}
</script>
