<template>
  <div class="main-container">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3">Mon profil</h1>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="d-flex flex-column col-md-4">
          <Card
            v-for="result in col1"
            :key="result.id"
            :id="result.id"
            :title="result.title"
            :img_src="result.link"
            :condition="result.type === 'video/mp4'"
          ></Card>
        </div>
        <div class="d-flex flex-column col-md-4">
          <Card
            v-for="result in col2"
            :key="result.id"
            :id="result.id"
            :title="result.title"
            :img_src="result.link"
            :condition="result.type === 'video/mp4'"
          ></Card>
        </div>
        <div class="d-flex flex-column col-md-4">
          <Card
            v-for="result in col3"
            :key="result.id"
            :id="result.id"
            :title="result.title"
            :img_src="result.link"
            :condition="result.type === 'video/mp4'"
          ></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
export default {
  name: 'Home',
  components: {
    Card
  },
  computed: {
    username: function () {
      return this.$store.getters.username
    }
  },
  data: function () {
    return {
      results: [],
      col1: [],
      col2: [],
      col3: []
    }
  },
  methods: {
    async loadImages () {
      const config = {
        method: 'get',
        url: 'https://api.imgur.com/3/account/' + this.username + '/favorites/'
      }

      await this.$http(config)
        .then((response) => {
          this.results = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  async mounted () {
    await this.loadImages()

    let i = 1

    this.results.forEach(result => {
      let ext = ''

      switch (result.type) {
        case 'image/jpeg':
          ext = 'jpeg'
          break

        case 'image/jpg':
          ext = 'jpg'
          break

        case 'image/png':
          ext = 'png'
          break

        case 'image/gif':
          ext = 'gif'
          break

        case 'video/mp4':
          ext = 'mp4'
          break

        default:
          ext = 'jpg'
          break
      }

      result.link = 'https://i.imgur.com/' + result.cover + '.' + ext

      // Push dans 3 tableaux pour faire bo
      switch (i) {
        case 1:
          this.col1.push(result)
          i++
          break
        case 2:
          this.col2.push(result)
          i++
          break
        case 3:
          this.col3.push(result)
          i = 1
          break
      }
    })
  }
}
</script>

<style scoped>
</style>
