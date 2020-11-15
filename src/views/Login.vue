<template>
  <div class="container main-container">
    <div class="row justify-content-center text-center mt-5">
      <div class="col">
        <h1 class="text-white">Connexion</h1>
        <button class="btn btn-success" @click="login()"><i class="fa fa-picture-o" aria-hidden="true"></i> Se connecter avec imgur</button>
      </div>
    </div>
  </div>
</template>

<script>
import { CLIENT_ID } from '../config/config'

export default {
  name: 'Login',

  methods: {
    login () {
      window.location.href = 'https://api.imgur.com/oauth2/authorize?client_id=' + CLIENT_ID + '&response_type=token'
    }
  }
}
</script>
