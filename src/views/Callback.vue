<template>
  <div></div>
</template>

<script>
export default {
  name: 'Callback',

  mounted () {
    const uri = window.location.href.split('#')
    const getVars = {}
    if (uri.length === 2) {
      const vars = uri[1].split('&')
      let tmp = ''
      vars.forEach(function (v) {
        tmp = v.split('=')
        if (tmp.length === 2) {
          getVars[tmp[0]] = tmp[1]
        }
      })
    }

    // On vérifie si on a une erreur, si oui on renvoie vers le login
    if (getVars.error) {
      this.$router.push({ path: '/login' })
    } else {
      // Si non, on vérifie qu'on a un access token et un username
      if (getVars.access_token && getVars.account_username) {
        const token = getVars.access_token
        const username = getVars.account_username
        // On l'a donc on login
        this.$store.dispatch('callback', { token, username })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      } else {
        // On l'a pas c'est bizarre
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
